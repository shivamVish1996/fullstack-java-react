package com.spring.pkgname.dao;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.stereotype.Repository;

import com.opencsv.CSVReader;
import com.spring.pkgname.modal.TestCsv;
import com.spring.pkgname.modal.rowmapper.TestCsvMapper;

@Repository
public class TestCsvDao {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	public List<TestCsv> allTestCsv() {
		String query = "SELECT * FROM testcsv";
		return (List<TestCsv>) jdbcTemplate.query(query, new TestCsvMapper());
	}

	public void uploadFile(Path filename) {

		// String filePath =
		// "D:\\workspace\\eclipse-workspace\\spring-security-jwt-h2\\uploads\\" +
		// filename;

		try {
			jdbcTemplate.update(new PreparedStatementCreator() {

				@SuppressWarnings("deprecation")
				@Override
				public PreparedStatement createPreparedStatement(Connection con) throws SQLException {

					String insertQuery = "INSERT into testcsv (first_name, last_name) values (?,?)";
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
					try {
						while ((rowData = reader.readNext()) != null) {
							i = 1;
							for (String data : rowData) {

								pstmt.setString(i, data);
								++i;

//								pstmt.setString((i % 2) + 1, data);
//
//								if (++i % 2 == 0)
//										pstmt.addBatch();// add batch
//
//								if (i % 20 == 0)// insert when the batch size is 10
//										pstmt.executeBatch();
							}
							pstmt.execute();
							pstmt.clearParameters();
						}
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

	}
}
