package com.spring.pkgname.modal.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.spring.pkgname.modal.TestCsv;

public class TestCsvMapper implements RowMapper<TestCsv> {

	@Override
	public TestCsv mapRow(ResultSet rs, int rowNum) throws SQLException {
		TestCsv testCsv = new TestCsv();
		testCsv.setId(rs.getInt("id"));
		testCsv.setFirstName(rs.getString("first_name"));
		testCsv.setLastName(rs.getString("last_name"));
		return testCsv;
	}

}