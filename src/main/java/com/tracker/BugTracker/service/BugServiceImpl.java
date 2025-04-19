package com.tracker.BugTracker.service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import com.tracker.BugTracker.entity.Bug;
import com.tracker.BugTracker.entity.BugStatus;
import com.tracker.BugTracker.entity.Project;
import com.tracker.BugTracker.entity.User;
import com.tracker.BugTracker.exception.ResourceNotFoundException;
import com.tracker.BugTracker.repository.BugRepository;
import com.tracker.BugTracker.repository.ProjectRepository;
import com.tracker.BugTracker.repository.UserRepository;

@Service
public class BugServiceImpl implements BugService {
	
	@Autowired
	private BugRepository bugRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ProjectRepository projectRepository;

	@Override
	public List<Bug> getAllBugs() {
		return bugRepository.findAll();
	}

	@Override
	public List<Bug> getReportedBugs() {
		String username =SecurityContextHolder.getContext().getAuthentication().getName();
		User tester=userRepository.getUserByUsername(username);
		return bugRepository.findAll().stream().filter(bug -> bug.getReportedBy()==tester).collect(Collectors.toList());
	}
	
	@Override
	public List<Bug> getAssignedBugs(){
		String username =SecurityContextHolder.getContext().getAuthentication().getName();
		User developer=userRepository.getUserByUsername(username);
		return bugRepository.findAll().stream().filter(bug -> bug.getAssignedTo() == developer).collect(Collectors.toList());
	}
	@Override
	public Bug getBug(long bugId) {
		return bugRepository.findById(bugId).orElseThrow(() -> new ResourceNotFoundException("bug not found"));
	}
	
	@Override
	public Bug getBugByTitle(String title) {
		Bug bug= bugRepository.getBugByTitle(title);
		if(bug !=  null) {
			return bug;
		}
		throw new ResourceNotFoundException("bug title not exists");
	}

	@Override
	public Bug addBug(Bug bug, long projectId) {
		String username =SecurityContextHolder.getContext().getAuthentication().getName();
		User tester=userRepository.getUserByUsername(username);
		Project project=projectRepository.findById(projectId).get();
		bug.setReportedBy(tester);
		bug.setAssignedTo(null);
		bug.setStatus(BugStatus.OPEN);
		bug.setProject(project);
		return bugRepository.save(bug);
	}

	@Override
	public Bug updateBugStatus(long bugId,Bug bug) {
		Bug bugIn = bugRepository.findById(bugId).orElseThrow(() -> new ResourceNotFoundException("bug not found"));
		bugIn.setStatus(bug.getStatus());
		return bugRepository.save(bugIn);
	}
	
	@Override
	public Bug updateReportedBug(long bugId, Map<String, Object> bug) {
		Bug bugIn = bugRepository.findById(bugId).orElseThrow(() -> new ResourceNotFoundException("bug not found"));
		String username =SecurityContextHolder.getContext().getAuthentication().getName();
		User tester=userRepository.getUserByUsername(username);
		if(bugIn.getReportedBy() == tester) {
			
			if(bug.containsKey("assignedTo")) {
				bug.remove("assignedTo");
			}
			
			bug.forEach((key, value) ->{
				Field field = ReflectionUtils.findField(Bug.class, key);
				field.setAccessible(true);
				ReflectionUtils.setField(field, bugIn, value);
			});
			return bugRepository.save(bugIn);
		}
		return null;
	}
	
	@Override
	public Bug assignBug(long bugId, long userId) {
		Bug bug=bugRepository.findById(bugId).orElseThrow(() -> new ResourceNotFoundException("bug not found"));
		User developer=userRepository.findById(userId).get();
		bug.setAssignedTo(developer);
		return bugRepository.save(bug);
	}
	
	@Override
	public boolean deleteBug(long bugId) {
		if(bugRepository.existsById(bugId)) {
			bugRepository.deleteById(bugId);
			return true;
		}
		return false;
	}

}
