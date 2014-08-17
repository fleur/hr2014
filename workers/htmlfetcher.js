
// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var fs = require('fs');
var path = require('path');
var archive = require(path.join(__dirname, '../helpers/archive-helpers.js'));
var mongodb = require("mongodb");
var saltwaterc = require('http-get');
var _ = require("underscore");

var mserver = new mongodb.Server("127.0.0.1", 27017, {});
var client = new mongodb.Db('archive', mserver);
var sitesCollection;


// Open the client's connection to the server:
client.open(function(err, p_client) {
  if (err) { console.log("connect failed: ", err); return; }
  console.log("Connected to MongoDB!");

  // Create a collection, if it doesn't exist already:
  client.createCollection("sites", function(err, collection) {
    if (err) { console.log("create collection failed: ", err); return; }
    console.log("Created sites collection");
    sitesCollection = collection;

    collection.find({ "pageSource" : { "$exists" : false } }).toArray(function(err, results) {
      if (err) { console.log("toArray failed: ", err); return; }

      console.log("results: " , results);
      var filteredResults = _.map(results, function(value) {
        return value['url'];
      })
      asyncMap(filteredResults, getAndSave, onExit, collection);

  });
  });
});

var getAndSave = function(url, callback) {

  saltwaterc.get({ url: url }, function (err, res) {
    if (err) { console.log("GET failed on url: " , url, ": ", err); return; }
    sitesCollection.update({ url: url },
                      {$set : { pageSource: res.buffer.toString() }}, {w:1}, function(err, content) {
      if (err) { console.log("update failed: ", err); return; }
      console.log("updated with content: ", url);
      callback(url);
    });

  });
}

var onExit = function(collected) {
  console.log("downloaded all: ", collected)
  client.close();
  console.log("Closed the collection");
};


// After action is done to all things in the array, call the callback.
var asyncMap = function (array, action, callback) {
  var unfinished = array.length;
  var collected = [];

  array.forEach(function (val) {

    action(val, function (x) {

      collected.push(x);
      unfinished--;

      if (unfinished === 0) {
        callback(collected);
      }

    });
  });
};
