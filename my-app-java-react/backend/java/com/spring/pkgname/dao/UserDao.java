package com.spring.pkgname.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.spring.pkgname.modal.AllUserInfo;
import com.spring.pkgname.modal.UserInfo;
import com.spring.pkgname.modal.rowmapper.AllUsersRowMapper;
import com.spring.pkgname.modal.rowmapper.EmployeeRowMapper;
import com.spring.pkgname.modal.rowmapper.UserRowMapper;

@Repository
public class UserDao {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	public UserInfo getUserInfo(String username) {
		UserInfo userInfo = null;
		try {
			String sql = "SELECT u.username name, u.password pass, a.authority role FROM "
					+ "users u INNER JOIN authorities a ON u.username=a.username WHERE "
					+ "u.enabled =1 AND u.username = ?";

			userInfo = (UserInfo) jdbcTemplate.queryForObject(sql, new Object[] { username }, new UserRowMapper());
		} catch (DataAccessException e) {
			System.out.println(e.getMessage());
		}
		return userInfo;
	}

	public List<UserInfo> getAllUsers() {
		List<UserInfo> users = null;

		String query = "SELECT u.username name, u.password pass, a.authority role FROM "
				+ "users u INNER JOIN authorities a ON u.username=a.username";

		users = (List<UserInfo>) jdbcTemplate.query(query, new UserRowMapper());

		return users;
	}

	public List<AllUserInfo> getAllUsersInfo() {
		List<AllUserInfo> users = null;

		String query = "SELECT u.username name, u.enabled active, a.authority role FROM "
				+ "users u INNER JOIN authorities a ON u.username=a.username";

		users = (List<AllUserInfo>) jdbcTemplate.query(query, new AllUsersRowMapper());

		return users;
	}

	public boolean addUser(UserInfo userInfo) {
		boolean result;
		try {
			String query1 = "INSERT INTO users(username, password, enabled) VALUES(?,?,?) ";
			jdbcTemplate.update(query1, userInfo.getUsername(), userInfo.getPassword(), 1);

			String query2 = "INSERT INTO authorities(username, authority) VALUES(?,?) ";
			jdbcTemplate.update(query2, userInfo.getUsername(), userInfo.getRole());
			result = true;

		} catch (DuplicateKeyException e) {
			System.out.println("DuplicateKeyException");
			result = false;
		} catch (Exception e) {
			System.out.println("Exception");
			result = false;
		}
		return result;
	}

	public boolean deleteUser(String username) {
		boolean result;
		try {

			String query2 = "DELETE FROM authorities WHERE username = ?";
			jdbcTemplate.update(query2, username);

			String query1 = "DELETE FROM users WHERE username = ?";
			jdbcTemplate.update(query1, username);

			result = true;
		} catch (DataAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			result = false;
		}
		return result;
	}

	public boolean updateActive(String username, int active) {
		boolean result;
		try {
			String query = "UPDATE users SET enabled=? WHERE username=?";
			jdbcTemplate.update(query, active, username);
			result = true;
		} catch (DataAccessException e) {
			result = false;
			e.printStackTrace();
		}
		return result;
	}

}
