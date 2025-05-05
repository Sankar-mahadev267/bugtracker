package com.tracker.BugTracker.service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import com.tracker.BugTracker.entity.User;
import com.tracker.BugTracker.exception.ResourceNotFoundException;
import com.tracker.BugTracker.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private BCryptPasswordEncoder pwdEncoder;
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}
	
	@Override
	public long userCount() {
		return userRepository.findAll().stream().count();
	}

	@Override
	public User getUser(long userId) {
		return userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Incorrect username"));
	}
	
	@Override
	public User addUser(User user) {
		String password=pwdEncoder.encode(user.getPassword());
		user.setPassword(password);
		return userRepository.save(user);
	}

	@Override
	public User getByUsername(String username) {
		User user=userRepository.getUserByUsername(username);
		if(user != null) {
			return user;
		}
		throw new ResourceNotFoundException("username not exists");
	}
	

	@Override
	public User updateUser(long userId,Map<String, Object> user) {
		User userIn =userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Incorrect username"));
		if(userIn!=null) {
			user.forEach((key,value) -> {
				Field field= ReflectionUtils.findField(User.class, key);
				field.setAccessible(true);
				ReflectionUtils.setField(field, userIn, value);
			});	
			return userRepository.save(userIn);
		}else {
			throw new ResourceNotFoundException("User not found");
		}
	}

	@Override
	public boolean deleteUser(long userId) {
		if(userRepository.existsById(userId)) {
			userRepository.deleteById(userId);
			return true;
		}
		return false;
	}

}
