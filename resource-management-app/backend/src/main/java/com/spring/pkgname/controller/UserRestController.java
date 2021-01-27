package com.spring.pkgname.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.spring.pkgname.dao.UserDao;
import com.spring.pkgname.modal.AllUserInfo;
import com.spring.pkgname.modal.UserInfo;

@CrossOrigin
@RestController
@RequestMapping(value = "/users")
public class UserRestController {

	@Autowired
	UserDao userDao;

//	@RequestMapping(value = "", method = RequestMethod.GET)
//	public ResponseEntity<List<UserInfo>> getUsers() {
//		List<UserInfo> users = userDao.getAllUsers();
//		return new ResponseEntity<List<UserInfo>>(users, HttpStatus.OK);
//	}

	@RequestMapping(value = "", method = RequestMethod.GET)
	public ResponseEntity<List<AllUserInfo>> getUsers() {
		List<AllUserInfo> users = userDao.getAllUsersInfo();
		return new ResponseEntity<List<AllUserInfo>>(users, HttpStatus.OK);
	}

	@RequestMapping(value = "", method = RequestMethod.POST)
	public ResponseEntity<String> addEmployee(@RequestBody UserInfo userInfo) {
		String result;
		if (userDao.addUser(userInfo)) {
			result = "User '" + userInfo.getUsername() + "' has been created successfully";
			return new ResponseEntity<String>(result, HttpStatus.CREATED);
		} else {
			result = "Username '" + userInfo.getUsername() + "' already exists";
			return new ResponseEntity<String>(result, HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/{username}", method = RequestMethod.DELETE)
	public ResponseEntity<String> deleteUser(@PathVariable("username") String username) {
		if (userDao.deleteUser(username))
			return new ResponseEntity<String>("User '" + username + "' is deleted successfully", HttpStatus.OK);
		else
			return new ResponseEntity<String>("Internal Server error. User '" + username + "' is not deleted",
					HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@RequestMapping(value = "/{username}/{active}")
	public ResponseEntity<String> updateActive(@PathVariable("username") String username,
			@PathVariable("active") int active) {

		String msg = "User '" + username + "' is deactivated successfully";
		if (active == 1)
			msg = "User '" + username + "' is activated successfully";

		boolean result = userDao.updateActive(username, active);
		if (result)
			return new ResponseEntity<String>(msg, HttpStatus.OK);
		else
			return new ResponseEntity<String>("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
