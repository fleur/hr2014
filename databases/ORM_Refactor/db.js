

var Sequelize = require("sequelize");
var sequelize = new Sequelize("chatter", "root", "");
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var User = sequelize.define('users', {
  username: Sequelize.STRING
});

var Message = sequelize.define('messages', {
  users_id: Sequelize.INTEGER,
  message: Sequelize.STRING,
  roomname: Sequelize.STRING
});

Message.belongsTo(User, {foreignKey: 'users_id'});
User.hasMany(Message);

sequelize.sync().error(function() {
  console.log("sync failed");
}).success(function() {
  console.log("w00t w00t");
});


exports.findAllMessages = function(cb){

  Message.findAll({
    attributes: ['message', 'roomname'],
    include: [{ model: User, attributes: ['username']}]
  }).success(function(messages) {
      cb(messages);
  }).error(function(error) {
      console.log('Error in findAllMessages:', error);
      cb(error);
  });
  // var query = 'SELECT users.username, messages.message, messages.roomname '+
  //   'FROM messages, users ' +
  //   'WHERE messages.users_id = users.id';
  // dbConnection.query(query, function(error, result) {
  //   if (error) {
  //     console.log(error);
  //     result = [{username : 'server', message: 'SELECT failed', roomname: 'mysql'}];
  //   }
  //   cb(error, result);
  // });
};

exports.findOrCreateUser = function(username, cb) {
  User.findOrCreate({username: username})
      .success(cb);
};

exports.saveMessage = function(chat, cb){
  Message.create(chat)
    .success(cb)
    .error(function(error) {
      console.log("error saving message: ", error);
      cb(error);
    });

  // var query = 'INSERT INTO messages SET ?';
  // var data = {message: message, users_id: userid, roomname: roomname};
  // dbConnection.query(query, data, function(error, result) {
  //   if (error) console.log(error);
  //   cb(error, result);
  // });
};
