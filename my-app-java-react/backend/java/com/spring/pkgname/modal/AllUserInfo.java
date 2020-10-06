package com.spring.pkgname.modal;

public class AllUserInfo {
	String username;
	String role;
	int active;
	
	public AllUserInfo() {
		// TODO Auto-generated constructor stub
	}

	public AllUserInfo(String username, String role, int active) {
		super();
		this.username = username;
		this.role = role;
		this.active = active;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public int getActive() {
		return active;
	}

	public void setActive(int active) {
		this.active = active;
	}

	@Override
	public String toString() {
		return "AllUserInfo [username=" + username + ", role=" + role + ", active=" + active + "]";
	}
	

}
