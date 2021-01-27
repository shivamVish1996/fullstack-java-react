package com.spring.pkgname.modal.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.spring.pkgname.modal.AllUserInfo;

public class AllUsersRowMapper implements RowMapper<AllUserInfo> {

	@Override
	public AllUserInfo mapRow(ResultSet rs, int rowNum) throws SQLException {
		AllUserInfo user = new AllUserInfo();
		user.setUsername(rs.getString("name"));
		user.setRole(rs.getString("role"));
		user.setActive(rs.getInt("active"));
		return user;
	}

}
