package com.spring.pkgname.modal;

public class Employee {

	private int id;
	private String firstName;
	private String lastName;
	private String skill;
	private String designation;
	private String addedBy;
	private String createdAt;
	
	public Employee() {
		// TODO Auto-generated constructor stub
	}

	public Employee(int id, String firstName, String lastName, String skill, String designation, String addedBy, String createdAt) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.skill = skill;
		this.designation = designation;
		this.addedBy = addedBy;
		this.createdAt = createdAt;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getSkill() {
		return skill;
	}

	public void setSkill(String skill) {
		this.skill = skill;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getAddedBy() {
		return addedBy;
	}

	public void setAddedBy(String addedBy) {
		this.addedBy = addedBy;
	}

	public String getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}

	@Override
	public String toString() {
		return "Employee [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", skill=" + skill
				+ ", designation=" + designation + ", addedBy=" + addedBy + ", createdAt=" + createdAt + "]";
	}
	
}
