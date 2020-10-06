package com.spring.pkgname.service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.spring.pkgname.modal.FileStorageProperties;

@Service
public class FileStorageService {

	private Path fileStorageLocation;
	
	@Autowired
	private FileStorageProperties fileStorageProperties;

//	@Autowired
//	public FileStorageService(FileStorageProperties fileStorageProperties) {
//		this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir()).toAbsolutePath().normalize();
//
//		try {
//			// Files.deleteIfExists(this.fileStorageLocation);
//			if (!Files.exists(this.fileStorageLocation))
//				Files.createDirectory(this.fileStorageLocation);
//
//		} catch (Exception ex) {
//			// ex.printStackTrace();
//			System.out.println("Could not create the directory where the uploaded files will be stored.");
//		}
//	}
	
	public void createDirectory(){
		this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir()).toAbsolutePath().normalize();

		try {
			// Files.deleteIfExists(this.fileStorageLocation);
			if (!Files.exists(this.fileStorageLocation))
				Files.createDirectory(this.fileStorageLocation);

		} catch (Exception ex) {
			// ex.printStackTrace();
			System.out.println("Could not create the directory where the uploaded files will be stored.");
		}
	}

	public Path storeFile(MultipartFile file) {

		Path targetLocation = null;
		String fileName = null;
		// Normalize file name
		// String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		InputStream is;
		try {
			fileName = StringUtils.cleanPath(file.getOriginalFilename());
			// Check if the file's name contains invalid characters
			if (fileName.contains("..")) {
				System.out.println("Sorry! Filename contains invalid path sequence " + fileName);
			}
			is = file.getInputStream();

			// Copy file to the target location (Replacing existing file with the same name)
			targetLocation = this.fileStorageLocation.resolve(fileName);
			Files.copy(is, targetLocation, StandardCopyOption.REPLACE_EXISTING);
			is.close();
			// return fileName;
			return targetLocation;
		} catch (IOException ex) {
			// ex.printStackTrace();
			System.out.println("Could not store file " + fileName + ". Please try again!");
		}

		return targetLocation;
	}

	public void deleteFile() {
		try {
			if (Files.exists(this.fileStorageLocation)) {
				final List<Path> pathsToDelete = Files.walk(this.fileStorageLocation).sorted(Comparator.reverseOrder())
						.collect(Collectors.toList());
				for (Path path : pathsToDelete) {
					Files.deleteIfExists(path);
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
