var db = require('./db');
var serverHelpers = require('./server-helpers');
// wham! magic.
var parseData = serverHelpers.collectData;
var saveMessage = db.saveMessage;
var saveUser = db.saveUser;
var findMessages = db.findAllMessages;
var findUser = db.findUser;

exports.sendResponse = serverHelpers.sendResponse;

exports.postMessage = function(req, res) {
  // declare this variable so we can retain access to it throughout the entire promise chain.
  var message;

  var resultsCallback = function (results) {
      var chat = {
        message: message.message,
        userid: results[0].id,
        roomname: message.roomname
      };

      saveMessage(chat.message, chat.userid, chat.roomname, function () {
        serverHelpers.sendResponse(res, message);
      });
  };

  parseData(req, function(_, msg) {
      message = msg;
      findUser(msg.username, function (err, results) {
        // no results/0 results
        if (err) console.log('Error finding user:', err);
        if (!results || !results.length) {
          // create the user, then post the message
          saveUser(message.username, resultsCallback);
        } else {
          // user exists, post the message to this user
          resultsCallback(results);
        }
      });
  });
};

exports.getMessages = function(req, res) {
  console.log("in getMessages");
  findMessages(function(err, messages) {
    console.log(err);
      serverHelpers.sendResponse(res, messages);
  });
};

exports.sendOptionsResponse = function(req, res) {
  serverHelpers.sendResponse(res, null);
};
