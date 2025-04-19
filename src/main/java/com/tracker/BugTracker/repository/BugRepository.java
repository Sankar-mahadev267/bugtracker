package com.tracker.BugTracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tracker.BugTracker.entity.Bug;

public interface BugRepository extends JpaRepository<Bug, Long> {

	Bug getBugByTitle(String title);
}
