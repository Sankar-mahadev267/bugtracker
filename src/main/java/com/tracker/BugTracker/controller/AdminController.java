package com.tracker.BugTracker.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tracker.BugTracker.entity.Bug;
import com.tracker.BugTracker.entity.Project;
import com.tracker.BugTracker.entity.User;
import com.tracker.BugTracker.service.BugServiceImpl;
import com.tracker.BugTracker.service.ProjectServiceImpl;
import com.tracker.BugTracker.service.UserServiceImpl;

@RestController
@RequestMapping("/bugtrackerapi/admin")
public class AdminController {

	@Autowired
	private UserServiceImpl userServiceImpl;
	
	@Autowired
	private ProjectServiceImpl projectServiceImpl;
	
	@Autowired
	private BugServiceImpl bugServiceImpl;
	
	@GetMapping("/users")
	public ResponseEntity<?> getAllUsers(){
		List<User> allUsers=userServiceImpl.getAllUsers();
		return ResponseEntity.status(HttpStatus.OK).body(allUsers);
	}	
	
	@GetMapping("/users/{userId}")
	public ResponseEntity<?> getUser(@PathVariable long userId){
		User user=userServiceImpl.getUser(userId);
		return ResponseEntity.status(HttpStatus.OK).body(user);
	}
	
	@PostMapping("/users")
	public ResponseEntity<User> addUser(@RequestBody User user){
		User postedUser=userServiceImpl.addUser(user);
		return ResponseEntity.status(HttpStatus.OK).body(postedUser);
	}
	
	@GetMapping("/users/username/{username}")
	public ResponseEntity<User> getByUsername(@PathVariable String username){
		User user=userServiceImpl.getByUsername(username);
		return ResponseEntity.status(HttpStatus.OK).body(user);
	}
	
	@PatchMapping("/users/{userId}")
	public ResponseEntity<User> updateUser(@PathVariable long userId,@RequestBody Map<String, Object> user){
		User updatedUser=userServiceImpl.updateUser(userId, user);
		return ResponseEntity.status(HttpStatus.OK).body(updatedUser);
	}
	
	@DeleteMapping("/users/{userId}")
	public ResponseEntity<?> deleteUser(@PathVariable long userId){
		if(userServiceImpl.deleteUser(userId)) {
			return new ResponseEntity<>(HttpStatus.OK);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("user not found");
	}
	
	@GetMapping("/projects")
	public ResponseEntity<?> getAllProjects(){
		List<Project> allProjects= projectServiceImpl.getAllProjects();
		return ResponseEntity.status(HttpStatus.OK).body(allProjects);
	}
	
	@GetMapping("/projects/title/{title}")
	public ResponseEntity<Project> getByProjectTitle(@PathVariable String title){
		Project project=projectServiceImpl.getByProjectTitle(title);
		return ResponseEntity.status(HttpStatus.OK).body(project);
	}
	
	@GetMapping("/projects/{projectId}")
	public ResponseEntity<Project> getProject(@PathVariable long projectId){
		Project project=projectServiceImpl.getProject(projectId);
		return ResponseEntity.status(HttpStatus.OK).body(project);
	}
	
	@GetMapping("/bugs")
	public ResponseEntity<?> getAllBugs(){
		List<Bug> allBugs= bugServiceImpl.getAllBugs();
		return ResponseEntity.status(HttpStatus.OK).body(allBugs);
	}

	@GetMapping("/bugs/{bugId}")
	public ResponseEntity<Bug> getBug(@PathVariable long bugId){
		Bug Bug= bugServiceImpl.getBug(bugId);
		return ResponseEntity.status(HttpStatus.OK).body(Bug);
	}
	
	@GetMapping("/bugs/title/{title}")
	public ResponseEntity<Bug> getByBugTitle(@PathVariable String title){
		System.out.println("bug title "+title);
		Bug bug=bugServiceImpl.getBugByTitle(title);
		return ResponseEntity.status(HttpStatus.OK).body(bug);
	}
	
}
