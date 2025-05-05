package com.tracker.BugTracker.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.tracker.BugTracker.entity.User;
import com.tracker.BugTracker.repository.UserRepository;

@Service
public class AuthService implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder pwdEncoder;
	
	@Autowired
	private AuthenticationManager authManager;
	
	@Autowired
	private JWTService jwtService;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user= userRepository.getUserByUsername(username);
		List<SimpleGrantedAuthority> authorities= user.getRoles().stream()
				.map(role -> new SimpleGrantedAuthority(role.name()))
				.collect(Collectors.toList());
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
	}
	
	public String register(User user) {
		String password= pwdEncoder.encode(user.getPassword());
		user.setPassword(password);
		userRepository.save(user);
		return jwtService.generateToken(user.getUsername());
	}
	
	public ResponseEntity<?> login(User user) {
		UsernamePasswordAuthenticationToken token= new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
		Authentication authenticate = authManager.authenticate(token);
		if(authenticate.isAuthenticated()) {
			String jwt=jwtService.generateToken(user.getUsername());
			return ResponseEntity.ok(jwt);
		}
		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	}
	
	public User profile() {
		String username=SecurityContextHolder.getContext().getAuthentication().getName();
		return userRepository.getUserByUsername(username);
	}
	
}
