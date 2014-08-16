
DROP DATABASE IF EXISTS chat;
CREATE DATABASE chat;

USE chat;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  username varchar(20),
  PRIMARY KEY (id)
);
INSERT INTO users (username) VALUES ('system');

DROP TABLE IF EXISTS messages;
CREATE TABLE messages (
  id INT(11) NOT NULL AUTO_INCREMENT,
  message text,
  users_id INT(11) NOT NULL,
  roomname varchar(20) NOT NULL default 'lobby',
  PRIMARY KEY (id),
  FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE
);
INSERT INTO messages (message, users_id)
  VALUES ('Im a message', (SELECT id from users WHERE username='system'));

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




