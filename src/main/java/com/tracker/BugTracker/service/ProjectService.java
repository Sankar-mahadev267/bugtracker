package com.tracker.BugTracker.service;

import java.util.List;
import java.util.Map;

import com.tracker.BugTracker.entity.Project;

public interface ProjectService {
	
	public List<Project> getAllProjects();
	public Project getProject(long projectId);
	public Project getByProjectTitle(String title);
	public Project addProject(Project project);
	public Project updateProject(long projectId,Map<String, Object> project);
	public boolean deleteProject(long projectId);
	
}
