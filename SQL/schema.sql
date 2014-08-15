
DROP DATABASE IF EXISTS chat;
CREATE DATABASE chat;

USE chat;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  username varchar(20),
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS rooms;
CREATE TABLE rooms (
  id INT(11) NOT NULL AUTO_INCREMENT,
  roomname varchar(2),
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS messages;
CREATE TABLE messages (
  id INT(11) NOT NULL AUTO_INCREMENT,
  message text,
  users_id INT(11) NOT NULL,
  rooms_id INT(11) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (rooms_id) REFERENCES rooms(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS friends;
CREATE TABLE friends (
  id INT(11) NOT NULL AUTO_INCREMENT,
  users_id INT(11) NOT NULL,
  friends_id INT(11) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (friends_id) REFERENCES users(id) ON DELETE CASCADE
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/




