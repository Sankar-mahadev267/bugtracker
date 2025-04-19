package com.tracker.BugTracker.service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import com.tracker.BugTracker.entity.Project;
import com.tracker.BugTracker.entity.User;
import com.tracker.BugTracker.exception.ResourceNotFoundException;
import com.tracker.BugTracker.repository.ProjectRepository;
import com.tracker.BugTracker.repository.UserRepository;

@Service
public class ProjectServiceImpl implements ProjectService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ProjectRepository projectRepository;

	
	@Override
	public List<Project> getAllProjects() {
		return projectRepository.findAll();
	}

	@Override
	public Project getProject(long projectId) {
		return projectRepository.findById(projectId).orElseThrow(() -> new ResourceNotFoundException("project not found"));
	}

	@Override
	public Project getByProjectTitle(String title) {
		Project project= projectRepository.getByProjectTitle(title);
		if(project != null) {
			return project;
		}
		throw new ResourceNotFoundException("project title not exists");
	}

	@Override
	public Project addProject(Project project) {
		String username =SecurityContextHolder.getContext().getAuthentication().getName();
		User manager=userRepository.getUserByUsername(username);
		project.setManager(manager);
		return projectRepository.save(project);
	}

	@Override
	public Project updateProject(long projectId, Map<String, Object> project) {
		Project projectIn= projectRepository.findById(projectId).get();
		if(projectIn!=null) {
			project.forEach((key, value) -> {
				Field field=ReflectionUtils.findField(Project.class, key);
				field.setAccessible(true);
				ReflectionUtils.setField(field, projectIn, value);
			});
			return projectRepository.save(projectIn);
		}
		else {
			throw new ResourceNotFoundException("project not found");
		}
	}

	@Override
	public boolean deleteProject(long projectId) {
		if(projectRepository.existsById(projectId)) {
			projectRepository.deleteById(projectId);
			return true;
		}
		return false;
	}
	
}
