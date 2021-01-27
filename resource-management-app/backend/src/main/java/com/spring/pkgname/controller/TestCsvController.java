package com.spring.pkgname.controller;

import java.nio.file.Path;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.spring.pkgname.dao.TestCsvDao;
import com.spring.pkgname.modal.TestCsv;
import com.spring.pkgname.service.FileStorageService;

@CrossOrigin
@RestController
@RequestMapping(value = "/testcsv")
public class TestCsvController {

	@Autowired
	TestCsvDao testCsvDao;

	@Autowired
	private FileStorageService fileStorageService;

	@RequestMapping(value = "", method = RequestMethod.GET)
	public ResponseEntity<List<TestCsv>> getTestCsvData() {
		List<TestCsv> csvData = testCsvDao.allTestCsv();
		return new ResponseEntity<List<TestCsv>>(csvData, HttpStatus.OK);
	}

	@RequestMapping(value = "/load/file", method = RequestMethod.GET)
	public ResponseEntity<String> loadFile() {
		// testCsvDao.uploadFile();
		return new ResponseEntity<String>("Uploaded successfully", HttpStatus.OK);
	}

	@RequestMapping(value = "/upload/file", method = RequestMethod.POST)
	public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
		fileStorageService.createDirectory();
		Path filePath = fileStorageService.storeFile(file);
		testCsvDao.uploadFile(filePath);
		fileStorageService.deleteFile();
		// System.out.println("rest fileName: " + fileName);
		return new ResponseEntity<String>("", HttpStatus.OK);
	}

}
