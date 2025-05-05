package com.tracker.BugTracker.service;

import java.util.List;
import java.util.Map;

import com.tracker.BugTracker.entity.Bug;

public interface BugService {

	public List<Bug> getAllBugs();
	public List<Bug> getReportedBugs();
	public List<Bug> getAssignedBugs();
	public Bug getBug(long bugId);
	public Bug getBugByTitle(String title);
	public Bug addBug(Bug bug,long projectId);
	public Bug updateBugStatus(long bugId, Bug bug);
	public Bug updateReportedBug(long bugId,Map<String, Object> bug);
	public Bug assignBug(long bugId, long userId);
	public boolean deleteBug(long bugId);
	public Map<String, Long> bugCount();
	public Map<String, Long> bugReportedCount();
	public Map<String, Long> bugAssignedCount();
	
}
