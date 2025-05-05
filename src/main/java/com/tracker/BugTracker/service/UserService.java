package com.tracker.BugTracker.service;

import java.util.List;
import java.util.Map;

import com.tracker.BugTracker.entity.User;

public interface UserService {

	public List<User> getAllUsers();
	public User addUser(User user);
	public User getUser(long userId);
	public User getByUsername(String username);
	public User updateUser(long userId,Map<String, Object> user);
	public boolean deleteUser(long userId);
	public long userCount();
	
}
