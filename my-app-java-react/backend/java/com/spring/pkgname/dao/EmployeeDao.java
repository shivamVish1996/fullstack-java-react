package com.spring.pkgname.dao;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Path;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.stereotype.Repository;

import com.opencsv.CSVReader;
import com.spring.pkgname.modal.Employee;
import com.spring.pkgname.modal.rowmapper.EmployeeRowMapper;
import com.spring.pkgname.util.Common;

@Repository
public class EmployeeDao {

	public static int totalRecords;

	@Autowired
	private JdbcTemplate jdbcTemplate;

	public int getCount() {
		int totalRecords = 0;
		String query = "SELECT COUNT(*) FROM employee";
		totalRecords = jdbcTemplate.queryForObject(query, Integer.class);
		return totalRecords;
	}

	public List<Employee> getEmployees() {
		String query = "SELECT * FROM employee";
		return (List<Employee>) jdbcTemplate.query(query, new EmployeeRowMapper());
	}

	public Employee getEmployee(int id) {
		String query = "SELECT * FROM employee WHERE id = ? ";
		return (Employee) jdbcTemplate.queryForObject(query, new Object[] { id }, new EmployeeRowMapper());
	}

	public void addEmployee(Employee employee) {

		String username = Common.getCurrentLoggedInUsername();
		DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("YYYY-MM-dd HH:mm:ss");

		// System.out.println("SecurityContextHolder - Username: " + username);

		LocalDateTime now = LocalDateTime.now();
		String currentDateTime = dateTimeFormatter.format(now);

		String query = "INSERT INTO employee(first_name, last_name, skill, designation, added_by, created_at) VALUES(?,?,?,?,?,?) ";
		jdbcTemplate.update(query, employee.getFirstName(), employee.getLastName(), employee.getSkill(),
				employee.getDesignation(), username, currentDateTime);
	}

	public int uploadFile(Path filename) {
		String username = Common.getCurrentLoggedInUsername();
		DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("YYYY-MM-dd HH:mm:ss");
		try {
			jdbcTemplate.update(new PreparedStatementCreator() {

				@SuppressWarnings("deprecation")
				@Override
				public PreparedStatement createPreparedStatement(Connection con) throws SQLException {

					String insertQuery = "INSERT INTO employee(first_name, last_name, skill, designation, added_by, created_at) VALUES(?,?,?,?,?,?) ";
					PreparedStatement pstmt = con.prepareStatement(insertQuery);

					String[] rowData = null;
					CSVReader reader = null;
					// FileReader fileReader = new FileReader(filePath);
					try {
						reader = new CSVReader(new FileReader(filename.toString()), ',');
					} catch (FileNotFoundException e) {
						e.printStackTrace();
					}

					int i;
					int totalRecords = 0;
					try {
						reader.readNext();
						while ((rowData = reader.readNext()) != null) {
							++totalRecords;
							i = 1;
							for (String data : rowData) {
								pstmt.setString(i, data);
								++i;
							}
							pstmt.setString(5, username);
							LocalDateTime now = LocalDateTime.now();
							String currentDateTime = dateTimeFormatter.format(now);
							pstmt.setString(6, currentDateTime);
							pstmt.execute();
							pstmt.clearParameters();
						}
						EmployeeDao.totalRecords = totalRecords;

						reader.close();

					} catch (IOException e) {
						e.printStackTrace();
					}
					return pstmt;
				}
			});
		} catch (DataAccessException e) {
			System.out.println(e.getMessage());
		}
		System.out.println("EmployeeDao totalRecords: " + totalRecords);
		return EmployeeDao.totalRecords;

	}

	public void updateEmployee(int id, Employee employee) {
		String query = "UPDATE employee SET first_name=?, last_name=?, skill=?, designation=?, added_by=? WHERE id=? ";
		jdbcTemplate.update(query, employee.getFirstName(), employee.getLastName(), employee.getSkill(),
				employee.getDesignation(), employee.getAddedBy(), id);
	}

	public void deleteEmployee(int id) {
		String query = "DELETE FROM employee WHERE id = ?";
		jdbcTemplate.update(query, id);
	}

	public boolean deleteAllEmployees() {
		String query = "TRUNCATE TABLE employee";
		boolean result;
		try {
			jdbcTemplate.execute(query);
			result = true;
		} catch (DataAccessException e) {
			result = false;
		}
		return result;
	}

//	public static void main(String[] args) {
//		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("YYYY-MMM-dd HH:mm:ss");
//		LocalDateTime now = LocalDateTime.now();
//		String currentDate = dtf.format(now);
//		System.out.println(currentDate);
//	}

}