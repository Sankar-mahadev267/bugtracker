package com.tracker.BugTracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tracker.BugTracker.entity.Bug;
import com.tracker.BugTracker.entity.Comment;
import com.tracker.BugTracker.service.BugServiceImpl;
import com.tracker.BugTracker.service.CommentServiceImpl;

@RestController
@RequestMapping("/bugtrackerapi/developer")
public class DeveloperController {
	
	@Autowired
	private CommentServiceImpl commentServiceImpl;
	
	@Autowired
	private BugServiceImpl bugServiceImpl;
	
	@GetMapping("/bugs")
	public ResponseEntity<?> getAssignedBugs(){
		List<Bug> assignedBugs=bugServiceImpl.getAssignedBugs();
		return ResponseEntity.status(HttpStatus.OK).body(assignedBugs);
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
	
	@PutMapping("/bugs/{bugId}")
	public ResponseEntity<Bug> updateBugStatus(@PathVariable long bugId, @RequestBody Bug bug){
		Bug updatedBug=bugServiceImpl.updateBugStatus(bugId, bug);
		return ResponseEntity.status(HttpStatus.OK).body(updatedBug);
	}
	
	//comments
	@PostMapping("/bugs/{bugId}/comments")
	public ResponseEntity<Comment> addComment(@PathVariable long bugId,@RequestBody Comment comment){
		Comment addedComment=commentServiceImpl.addComment(bugId,comment);
		return ResponseEntity.status(HttpStatus.CREATED).body(addedComment);
	}
	
	@GetMapping("/bugs{bugId}/comments")
	public ResponseEntity<?> getComments(@PathVariable long bugId){
		List<Comment> comments=bugServiceImpl.getBug(bugId).getComments();
		return ResponseEntity.status(HttpStatus.OK).body(comments);
	}
	
	//counts 
	
	@GetMapping("/bugs/count")
	public ResponseEntity<?> bugReportedCount(){
		return ResponseEntity.status(HttpStatus.OK).body(bugServiceImpl.bugAssignedCount());
	}

}
