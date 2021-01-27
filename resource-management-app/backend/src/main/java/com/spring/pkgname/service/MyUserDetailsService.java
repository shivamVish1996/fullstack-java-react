package com.spring.pkgname.service;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.spring.pkgname.dao.UserDao;
import com.spring.pkgname.modal.UserInfo;

@Service
public class MyUserDetailsService implements UserDetailsService {

	@Autowired
	private UserDao userDao;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// return new User("shivam", "shivam", new ArrayList<>());

		UserInfo userInfo = userDao.getUserInfo(username);
		if (userInfo != null) {
			GrantedAuthority authority = new SimpleGrantedAuthority(userInfo.getRole());

			UserDetails userDetails = (UserDetails) new User(userInfo.getUsername(), userInfo.getPassword(),
					Arrays.asList(authority));
			return userDetails;
		} else {
			System.out.println("invalid username or password");
			return null;
		}
	}

//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		return new User("shivam", "shivam", new ArrayList<>());
//	}

}