package com.tracker.BugTracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tracker.BugTracker.entity.User;
import com.tracker.BugTracker.service.AuthService;

@RestController
@RequestMapping("/bugtrackerapi")
public class AuthController {
	
	@Autowired
	private AuthService authService;
	
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody User user){
		String jwt=authService.register(user);
		if(jwt!=null) {
			return ResponseEntity.ok(jwt);
		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User user){
		return authService.login(user);
	}

	@GetMapping("/profile")
	public ResponseEntity<User> profile(){
		User profile=authService.profile();
		return ResponseEntity.status(HttpStatus.OK).body(profile);
	}
}
