package com.tracker.BugTracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tracker.BugTracker.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

	User getUserByUsername(String Username);
	
}
