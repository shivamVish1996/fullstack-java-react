package com.spring.pkgname.modal;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

public class AuthenticationResponse {

	private String username;
	Collection<? extends GrantedAuthority> roles;
	private String jwt;

	public AuthenticationResponse() {

	}

	public AuthenticationResponse(String username, Collection<? extends GrantedAuthority> roles, String jwt) {
		super();
		this.username = username;
		this.roles = roles;
		this.jwt = jwt;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Collection<? extends GrantedAuthority> getRoles() {
		return roles;
	}

	public void setRoles(Collection<? extends GrantedAuthority> roles) {
		this.roles = roles;
	}

	public String getJwt() {
		return jwt;
	}

	public void setJwt(String jwt) {
		this.jwt = jwt;
	}

}
