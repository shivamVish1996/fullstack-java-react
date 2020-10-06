package com.spring.pkgname.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.spring.pkgname.modal.AuthenticationRequest;
import com.spring.pkgname.modal.AuthenticationResponse;
import com.spring.pkgname.service.MyUserDetailsService;
import com.spring.pkgname.util.JwtUtil;

@CrossOrigin
@RestController
public class HomeController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUtil jwtTokenUtil;

	@Autowired
	private MyUserDetailsService userDetailsService;

	@RequestMapping(path = "/secure", method = RequestMethod.GET)
	public ResponseEntity<String> home() {
		return new ResponseEntity<String>("Welcome", HttpStatus.OK);
	}

//	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
//	public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest)
//			throws Exception {
//
//		try {
//			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
//					authenticationRequest.getUsername(), authenticationRequest.getPassword()));
//		} catch (BadCredentialsException e) {
//			throw new Exception("Incorrect username or password", e);
//		}
//
//		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
//		final String jwt = jwtTokenUtil.generateToken(userDetails);
//		return ResponseEntity.ok(new AuthenticationResponse(jwt));
//	}
	
	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity<AuthenticationResponse> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest)
			throws Exception {

		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					authenticationRequest.getUsername(), authenticationRequest.getPassword()));
		} catch (BadCredentialsException e) {
			throw new Exception("Incorrect username or password", e);
		}

		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
		final String jwt = jwtTokenUtil.generateToken(userDetails);
		
		AuthenticationResponse authenticationResponse = new AuthenticationResponse();
		authenticationResponse.setUsername(userDetails.getUsername());
		authenticationResponse.setRoles(userDetails.getAuthorities());
		authenticationResponse.setJwt(jwt);
		
		return new ResponseEntity<AuthenticationResponse>(authenticationResponse, HttpStatus.OK);
	}

}