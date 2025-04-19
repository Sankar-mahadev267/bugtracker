package com.tracker.BugTracker.service;

import java.util.List;

import com.tracker.BugTracker.entity.Comment;

public interface CommentService {

	public List<Comment> getAllComments();
	public Comment getComment(long commentId);
	public Comment addComment(long bugId, Comment comment);
	public boolean deleteComment(long commentId);
	
}
