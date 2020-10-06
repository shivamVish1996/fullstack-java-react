package com.spring.pkgname.modal.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import com.spring.pkgname.modal.UserInfo;

public class UserRowMapper implements RowMapper<UserInfo> {
	
	@Override
	public UserInfo mapRow(ResultSet rs, int rowNum) throws SQLException {
		UserInfo user = new UserInfo();
		user.setUsername(rs.getString("name"));
		user.setPassword(rs.getString("pass"));
		user.setRole(rs.getString("role"));
		return user;
	}

}
