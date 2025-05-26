package com.tracker.BugTracker.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table
public class Bug {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable = false)
	private String title;
	
	private String description;
	
	@Enumerated(EnumType.STRING)
	private BugStatus status;
	
	@ManyToOne
	@JoinColumn(name = "reported_user_id")
	private User reportedBy;
	
	@ManyToOne
	@JoinColumn(name = "assigned_user_id")
	private User assignedTo;
	
	@ManyToOne
	@JoinColumn(name = "project_id")
	private Project project;
	
	@OneToMany(mappedBy = "bug")
	private List<Comment> comments;
	
	private LocalDateTime createdAt = LocalDateTime.now();

	public Bug(long id, String title, String description, BugStatus status, User reportedBy, User assignedTo,
			Project project, List<Comment> comments, LocalDateTime createdAt) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.status = status;
		this.reportedBy = reportedBy;
		this.assignedTo = assignedTo;
		this.project = project;
		this.comments = comments;
		this.createdAt = createdAt;
	}

	public Bug() {
		super();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public BugStatus getStatus() {
		return status;
	}

	public void setStatus(BugStatus status) {
		this.status = status;
	}

	public User getReportedBy() {
		return reportedBy;
	}

	public void setReportedBy(User reportedBy) {
		this.reportedBy = reportedBy;
	}

	public User getAssignedTo() {
		return assignedTo;
	}

	public void setAssignedTo(User assignedTo) {
		this.assignedTo = assignedTo;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}
	
	public List<Comment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	
}
