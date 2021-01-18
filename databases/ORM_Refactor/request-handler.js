var db = require('./db');
var serverHelpers = require('./server-helpers');
// wham! magic.
var parseData = serverHelpers.collectData;
var saveMessage = db.saveMessage;
var findMessages = db.findAllMessages;
var findOrCreateUser = db.findOrCreateUser;

exports.sendResponse = serverHelpers.sendResponse;

exports.postMessage = function(req, res) {
  // declare this variable so we can retain access to it throughout the entire promise chain.
  var message;

  var resultsCallback = function (user) {
      var chat = {
        message: message.message,
        users_id: user.id,
        roomname: message.roomname
      };

      saveMessage(chat, function () {
        serverHelpers.sendResponse(res, message);
      });
  };

  parseData(req, function(_, msg) {
      message = msg;
      findOrCreateUser(msg.username, resultsCallback);
  });
};

exports.getMessages = function(req, res) {
  console.log("in getMessages");
  findMessages(function(messages) {
    console.log(messages);
    serverHelpers.sendResponse(res, messages);
  });
};

exports.sendOptionsResponse = function(req, res) {
  serverHelpers.sendResponse(res, null);
};
