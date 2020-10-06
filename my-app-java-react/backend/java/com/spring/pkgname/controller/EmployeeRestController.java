package com.spring.pkgname.controller;

import java.nio.file.Path;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.spring.pkgname.dao.EmployeeDao;
import com.spring.pkgname.modal.Employee;
import com.spring.pkgname.service.FileStorageService;

@CrossOrigin
@RestController
@RequestMapping(value = "/employees")
public class EmployeeRestController {

	@Autowired
	EmployeeDao employeeDao;

	@Autowired
	private FileStorageService fileStorageService;

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public ResponseEntity<Integer> getCount() {
		int count = employeeDao.getCount();
		return new ResponseEntity<Integer>(count, HttpStatus.OK);
	}

	@RequestMapping(value = "", method = RequestMethod.GET)
	public ResponseEntity<List<Employee>> getEmployees() {
		List<Employee> employees = employeeDao.getEmployees();
		return new ResponseEntity<List<Employee>>(employees, HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Employee> getEmployee(@PathVariable("id") int id) {
		Employee employee = employeeDao.getEmployee(id);
		return new ResponseEntity<Employee>(employee, HttpStatus.OK);
	}

	@RequestMapping(value = "", method = RequestMethod.POST)
	public ResponseEntity<String> addEmployee(@RequestBody Employee employee) {
		employeeDao.addEmployee(employee);
		return new ResponseEntity<String>("Employee created successfully", HttpStatus.CREATED);
	}

	@RequestMapping(value = "/upload/file", method = RequestMethod.POST)
	public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
		String result = "Employee file uploaded.";
		int totalRecords;
		boolean flag = true;
		try {
			fileStorageService.createDirectory();
			Path filePath = fileStorageService.storeFile(file);
			totalRecords = employeeDao.uploadFile(filePath);
			fileStorageService.deleteFile();
			result = result + " " + totalRecords + " record(s) added successfully";
		} catch (Exception e) {
			result = "Internal Server Error";
			flag = false;
			System.out.println("Employee file upload: " + e.getMessage());
		}
		if (flag)
			return new ResponseEntity<String>(result, HttpStatus.OK);
		else
			return new ResponseEntity<String>(result, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<String> deleteEmployee(@PathVariable("id") int id) {
		employeeDao.deleteEmployee(id);
		return new ResponseEntity<String>("Employee deleted successfully", HttpStatus.OK);
	}

	@RequestMapping(value = "", method = RequestMethod.DELETE)
	public ResponseEntity<String> deleteAllEmployees() {

		if (employeeDao.deleteAllEmployees())
			return new ResponseEntity<String>("All employees deleted successfully", HttpStatus.OK);
		else
			return new ResponseEntity<String>("Internal Server error", HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void updateEmployee(@PathVariable("id") int id, @RequestBody Employee employee) {
		employeeDao.updateEmployee(id, employee);
	}
}