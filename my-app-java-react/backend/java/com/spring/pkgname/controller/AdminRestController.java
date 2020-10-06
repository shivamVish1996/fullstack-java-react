package com.spring.pkgname.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping(value = "/admin")
public class AdminRestController {
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public ResponseEntity<String> getEmployees() {
		return new ResponseEntity<String>("Admin", HttpStatus.OK);
	}

}
