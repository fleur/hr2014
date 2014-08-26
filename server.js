// var static = require('node-static');

// //
// // Create a node-static server instance to serve the './public' folder
// //
// var file = new static.Server('./');

// require('http').createServer(function (request, response) {
//     request.addListener('end', function () {
//         //
//         // Serve files!
//         //
//         file.serve(request, response);
//     }).resume();
// }).listen(8080);

//var util = require('./server_util.js');
var path = require('path')
var express = require('express');
var session = require('express-session');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var childProcess = require('child_process');
var phantomjs = require('phantomjs');
var app = express();


// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
// Parse forms (signup/login)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
  //res.end();
});

app.get('/api/ticker', function(req, res) {
  var binPath = phantomjs.path
  var childArgs = [
    path.join(__dirname, 'phantom.js'),
  ];

  childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {

    console.log(stdout);
    res.send(stdout);
    res.end();
  });


});

app.get('/*', function(req, res) {
  res.send(404);
  res.end();
});


console.log('listening on 8080');
app.listen(8080);
