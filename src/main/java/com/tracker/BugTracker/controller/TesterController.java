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
import com.tracker.BugTracker.entity.Comment;
import com.tracker.BugTracker.entity.Project;
import com.tracker.BugTracker.service.BugServiceImpl;
import com.tracker.BugTracker.service.CommentServiceImpl;
import com.tracker.BugTracker.service.ProjectServiceImpl;

@RestController
@RequestMapping("/bugtrackerapi/tester")
public class TesterController {
	
	@Autowired
	private BugServiceImpl bugServiceImpl;
	
	@Autowired
	private ProjectServiceImpl projectServiceImpl;
	
	@Autowired
	private CommentServiceImpl commentServiceImpl;
	
	@PostMapping("/projects/{projectId}/bugs")
	public ResponseEntity<Bug> reportBug(@RequestBody Bug bug, @PathVariable long projectId) {
		Bug reportedBug= bugServiceImpl.addBug(bug,projectId);
		return ResponseEntity.status(HttpStatus.CREATED).body(reportedBug);
	}
	
	@PatchMapping("/bugs/{bugId}")
	public ResponseEntity<?> updateReportedBug(@PathVariable long bugId, @RequestBody Map<String, Object> bug){
		Bug updatedBug=bugServiceImpl.updateReportedBug(bugId, bug);
		if(updatedBug!=null) {
			return ResponseEntity.status(HttpStatus.OK).body(updatedBug);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("not reported by you");
	}
	
	@GetMapping("/projects/title/{title}")
	public ResponseEntity<Project> getProjectByTitle(@PathVariable String title){
		Project project=projectServiceImpl.getByProjectTitle(title);
		return ResponseEntity.status(HttpStatus.OK).body(project);
	}
	
	@GetMapping("/bugs/title/{title}")
	public ResponseEntity<Bug> getBugByTitle(@PathVariable String title){
		Bug bug=bugServiceImpl.getBugByTitle(title);
		return ResponseEntity.status(HttpStatus.OK).body(bug);
	}
	
	@GetMapping("/bugs")
	public ResponseEntity<?> getReportedBugs(){
		List<Bug> reportedBugs=bugServiceImpl.getReportedBugs();
		return ResponseEntity.status(HttpStatus.OK).body(reportedBugs);
	}
	
	@GetMapping("/bugs/{bugId}")
	public ResponseEntity<Bug> getBug(@PathVariable long bugId){
		Bug bug=bugServiceImpl.getBug(bugId);
		return ResponseEntity.status(HttpStatus.OK).body(bug);
	}
	
	@PostMapping("/bugs/{bugId}/comments")
	public ResponseEntity<?> addComment(@PathVariable long bugId,@RequestBody Comment comment){
		Comment addedComment=commentServiceImpl.addComment(bugId,comment);
		return ResponseEntity.status(HttpStatus.OK).body(addedComment);
	}
	
	@PutMapping("/bugs/{bugId}")
	public ResponseEntity<?> updateBugStatus(@PathVariable long bugId, @RequestBody Bug bug){
		Bug updatedBug=bugServiceImpl.updateBugStatus(bugId, bug);
		return ResponseEntity.status(HttpStatus.OK).body(updatedBug);
	}
	
	@DeleteMapping("/bugs/{bugId}")
	public ResponseEntity<?> deleteBug(@PathVariable long bugId){
		if(bugServiceImpl.deleteBug(bugId)) {
			return new ResponseEntity<>(HttpStatus.OK);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("bug not found");
	}

}
