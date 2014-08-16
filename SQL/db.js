var mysql = require('mysql');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/




exports.findAllMessages = function(cb){
  var query = 'SELECT users.username, messages.message, rooms.roomname '+
    'FROM messages, users, rooms ' +
    'WHERE messages.users_id = users.id AND ' +
    'messages.rooms_id = rooms.id';
  dbConnection.query(query, function(error, result) {
    if (error) {
      console.log(error);
      result = [{username : 'server', message: 'SELECT failed', roomname: 'mysql'}];
    }
    cb(error, result);
  });
};

exports.findUser = function(username, cb){
  var query = "SELECT id FROM users WHERE username = ?";
  dbConnection.query(query, username, cb);
};

exports.saveUser = function(username, cb){
  var query = 'INSERT INTO users SET ?'
  dbConnection.query(query, {'username': username}, function(error, result) {
    if (error) console.log(error);
    console.log('result of saveUser',result)
    cb([{id: result.insertId}]);
  });
};

exports.saveMessage = function(message, userid, roomname, cb){
};
