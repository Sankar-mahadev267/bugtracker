package com.tracker.BugTracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tracker.BugTracker.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {

}
