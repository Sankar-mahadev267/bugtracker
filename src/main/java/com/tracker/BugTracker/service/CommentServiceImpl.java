package com.tracker.BugTracker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.tracker.BugTracker.entity.Bug;
import com.tracker.BugTracker.entity.Comment;
import com.tracker.BugTracker.entity.User;
import com.tracker.BugTracker.exception.ResourceNotFoundException;
import com.tracker.BugTracker.repository.BugRepository;
import com.tracker.BugTracker.repository.CommentRepository;
import com.tracker.BugTracker.repository.UserRepository;

@Service
public class CommentServiceImpl implements CommentService {

	@Autowired
	private CommentRepository commentRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BugRepository bugRepository;
	
	@Override
	public List<Comment> getAllComments() {
		return commentRepository.findAll();
	}

	@Override
	public Comment getComment(long commentId) {
		return commentRepository.findById(commentId).orElseThrow(() -> new ResourceNotFoundException("comment not found"));
	}

	@Override
	public Comment addComment(long bugId, Comment comment) {
		String username =SecurityContextHolder.getContext().getAuthentication().getName();
		User author=userRepository.getUserByUsername(username);
		Bug bug=bugRepository.findById(bugId).orElseThrow(() -> new ResourceNotFoundException("Bug not found"));
		comment.setAuthor(author);
		comment.setBug(bug);
		return commentRepository.save(comment);
	}

	@Override
	public boolean deleteComment(long commentId) {
		if(commentRepository.existsById(commentId)) {
			commentRepository.deleteById(commentId);
			return true;
		}
		return false;
	}

}
