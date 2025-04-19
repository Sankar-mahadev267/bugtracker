package com.tracker.BugTracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tracker.BugTracker.entity.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
	
	Project getByProjectTitle(String title);
}
