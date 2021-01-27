 
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  username VARCHAR(50) NOT NULL PRIMARY KEY,
  password VARCHAR(50) NOT NULL,
  enabled TINYINT NOT NULL
);

-- NOTE: The passwords are encrypted using BCrypt
-- A generation tool is avail at: http://www.luv2code.com/generate-bcrypt-password
-- Default passwords here are: fun123

INSERT INTO users 
VALUES 
('employee1', 'password', 1),
('employee2', 'password', 0),
('admin1', 'password', 1),
('admin2', 'password', 0);

DROP TABLE IF EXISTS authorities;
CREATE TABLE authorities (
  username VARCHAR(50) NOT NULL,
  authority VARCHAR(50) NOT NULL,
  UNIQUE KEY authorities_idx_1 (username,authority),
  CONSTRAINT authorities_ibfk_1 FOREIGN KEY (username) REFERENCES users (username)
);

INSERT INTO authorities 
VALUES 
('employee1', 'ROLE_EMPLOYEE'),
('employee2', 'ROLE_EMPLOYEE'),
('admin1', 'ROLE_ADMIN'),
('admin2', 'ROLE_ADMIN');


DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
  id INT AUTO_INCREMENT  PRIMARY KEY,
  first_name VARCHAR(250) NOT NULL,
  last_name VARCHAR(250) NOT NULL,
  skill VARCHAR(250) NOT NULL,
  designation VARCHAR(250) DEFAULT NULL,
  added_by VARCHAR(250) NOT NULL,
  created_at DATETIME
);
 
INSERT INTO employee (first_name, last_name, skill, designation, added_by, created_at) VALUES
  ('Shivam', 'Vishwakarma', 'Java', 'Software engineer', 'db_admin', '2020-09-10 16:00:01'),
  ('Parag', 'Shaha', 'Full stack', 'Sr Software engineer', 'db_admin', '2020-09-10 16:00:04'),
  ('Swapnil', 'Sonar', 'Full stack', 'Technical lead', 'db_admin', '2020-09-10 16:00:05'),
  ('Ashoka', 'V', 'Api testing', 'Sr Test engineer', 'db_admin', '2020-09-10 16:00:06'),
  ('Sayali', 'Kadam', 'Cucumber', 'Test engineer', 'db_admin', '2020-09-10 16:00:07');
  
 DROP TABLE IF EXISTS testcsv;
CREATE TABLE testcsv (
  id INT AUTO_INCREMENT  PRIMARY KEY,
  first_name VARCHAR(250) NOT NULL,
  last_name VARCHAR(250) NOT NULL
);
 
INSERT INTO testcsv (first_name, last_name) VALUES
  ('Shivam', 'Vishwakarma');
  