// var path = require('path');
var url = require('url');
var mysql = require('mysql2');
var crypto = require('cryptojs');
var _ = require('underscore');
var path = require('path');
var httpHelper = require('./http-helpers.js');
var archive = require(path.join(__dirname, '../helpers/archive-helpers.js'));

// require more modules/folders here!

// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "web_historian"
// });
var mongodb = require("mongodb");

var server = new mongodb.Server("127.0.0.1", 27017, {});
var client = new mongodb.Db('archive', server);
var collection;

client.open(function(err, p_client) {
  if (err) {
    console.log("failed to connect to mongo: ", err);
  }
  console.log("Connected to MongoDB!");

  // Create a collection, if it doesn't exist already:
  client.createCollection("sites", function(err, col) {
    if (err) {
      console.log("failed to create or get collection: ", err)
    }
    console.log("Created collection");
    collection = col;
  });

});

var handleGet = function(req, res) {
  var parsedUrl = url.parse(req.url);
  if (parsedUrl.pathname === '/') {

    httpHelper.serveAssets(res, archive.paths.siteAssets + 'index.html');

  } else if (_.contains(['/index.html', '/loading.html', '/styles.css'], parsedUrl.pathname)){

    httpHelper.serveAssets(res, archive.paths.siteAssets + parsedUrl.pathname);

  } else {

    // check collection for url
    console.log("checking for: ", parsedUrl.pathname.slice(1));
    collection.find({ url: parsedUrl.pathname.slice(1),
                      pageSource : { "$exists" : true } }).toArray(function(err, results) {
      if (err) { console.log("toArray failed: ", err); return; }

      // if url is there, serve up contents
      console.log(results[0]);
      if (results.length > 0) {

        // return results.pageSource
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(results[0].pageSource);

      } else {

        res.writeHead(400);
        res.end("Page Not Found");
      }
    });
  }
};

var handlePost = function(req, res) {
  var body = '';
  req.on('data', function(chunk) {
    body += chunk;
  });
  req.on('end', function() {

    body = body.substr(4);
    body = decodeURIComponent(body);

    collection.insert({ url: body }, function(err, results) {

      // check to see if we already have the requested static file aor) {
      if (err) {
        console.log("error adding url: " , err);
        res.writeHead(500, "Insert to database failed");
        res.end("Server Error");
      } else {
        res.writeHead(302, {'Location': 'loading.html'});
        res.end();
      }
    });
  });
};

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    handleGet(req, res);
  } else if (req.method === 'POST') {
    handlePost(req, res);
  }
};
