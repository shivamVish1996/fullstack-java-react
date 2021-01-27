package com.spring.pkgname.modal.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.spring.pkgname.modal.Employee;


public class EmployeeRowMapper implements RowMapper<Employee> {

	@Override
	public Employee mapRow(ResultSet rs, int rowNum) throws SQLException {
		Employee employee = new Employee();
		employee.setId(rs.getInt("id"));
		employee.setFirstName(rs.getString("first_name"));
		employee.setLastName(rs.getString("last_name"));
		employee.setSkill(rs.getString("skill"));
		employee.setDesignation(rs.getString("designation"));
		employee.setAddedBy(rs.getString("added_by"));
		employee.setCreatedAt(rs.getString("created_at"));
		return employee;
	}

}
