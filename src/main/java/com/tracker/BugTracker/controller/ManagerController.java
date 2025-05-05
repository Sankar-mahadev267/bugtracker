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
import org.springframework.web.bind.annotation.PutMapping;
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
@RequestMapping("/bugtrackerapi/manager")
public class ManagerController {
	
	@Autowired
	private ProjectServiceImpl projectServiceImpl;
	
	@Autowired
	private BugServiceImpl bugServiceImpl;
	
	@Autowired
	private UserServiceImpl userServiceImpl;
	
	@GetMapping("/projects")
	public ResponseEntity<?> getAllProjects(){
		List<Project> allProjects= projectServiceImpl.getAllProjects();
		return ResponseEntity.status(HttpStatus.OK).body(allProjects);
	}

	@GetMapping("/projects/{projectId}")
	public ResponseEntity<Project> getProject(@PathVariable long projectId){
		Project project=projectServiceImpl.getProject(projectId);
		return ResponseEntity.status(HttpStatus.OK).body(project);
	}
	
	@PostMapping("/projects")
	public ResponseEntity<Project> addProject(@RequestBody Project project) {
		Project projectCreated=projectServiceImpl.addProject(project);
		return ResponseEntity.status(HttpStatus.CREATED).body(projectCreated);
	}
	
	@PatchMapping("/projects/{projectId}")
	public ResponseEntity<Project> updateProject(@PathVariable long projectId , @RequestBody Map<String, Object> project) {
		Project updatedProject = projectServiceImpl.updateProject(projectId, project);
		return ResponseEntity.status(HttpStatus.OK).body(updatedProject);
	}
	
	@DeleteMapping("/projects/{projectId}")
	public ResponseEntity<?> deleteProject(@PathVariable long projectId){
		if(projectServiceImpl.deleteProject(projectId)) {
			return new ResponseEntity<>(HttpStatus.OK);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("project not found");
	}
	
	@GetMapping("/users/username/{username}")
	public ResponseEntity<User> getDeveloper(@PathVariable String username){
		User developer=userServiceImpl.getByUsername(username);
		return ResponseEntity.status(HttpStatus.OK).body(developer);
	}
	
	@GetMapping("/projects/title/{title}")
	public ResponseEntity<Project> getProjectByTitle(@PathVariable String title){
		Project project=projectServiceImpl.getByProjectTitle(title);
		return ResponseEntity.status(HttpStatus.OK).body(project);
	}
	
	@GetMapping("/bugs")
	public ResponseEntity<?> getAllBugs(){
		List<Bug> allBugs= bugServiceImpl.getAllBugs();
		return ResponseEntity.status(HttpStatus.OK).body(allBugs);
	}
	
	@GetMapping("/bugs/{bugId}")
	public ResponseEntity<Bug> getBug(@PathVariable long bugId){
		Bug bug=bugServiceImpl.getBug(bugId);
		return ResponseEntity.status(HttpStatus.OK).body(bug);
	}
	
	@GetMapping("/bugs/title/{title}")
	public ResponseEntity<Bug> getBugByTitle(@PathVariable String title){
		Bug bug=bugServiceImpl.getBugByTitle(title);
		return ResponseEntity.status(HttpStatus.OK).body(bug);
	}
	
	@PutMapping("/bugs/{bugId}/assign/{userId}")
	public ResponseEntity<Bug> assignBug(@PathVariable long bugId, @PathVariable long userId){
		Bug assignedBug= bugServiceImpl.assignBug(bugId, userId);
		return ResponseEntity.status(HttpStatus.OK).body(assignedBug);
	}
	
	//counts for dashboad
	
	@GetMapping("/projects/count")
	public ResponseEntity<?> projectCount(){
		return ResponseEntity.status(HttpStatus.OK).body(projectServiceImpl.projectCount());
	}
	
	@GetMapping("/bugs/count")
	public ResponseEntity<?> bugCount(){
		return ResponseEntity.status(HttpStatus.OK).body(bugServiceImpl.bugCount());
	}

	
}
