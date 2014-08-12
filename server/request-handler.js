/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
var url = require("url");
var _ = require("underscore");
var fs = require("fs");

// exports.data = {
//   results: []
// };

exports.initializeData = function(string){
  if (string !== undefined) {
    exports.data = JSON.parse(string);
  } else {
    exports.data = { results : [] };
  }
}

exports.handler = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */

  console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode = 200;

  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "text/plain";
  var parsedUrl = url.parse(request.url, true);
  /* .writeHead() tells our server what HTTP status code to send back */
  //response.writeHead(statusCode, headers);

  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/

   if (parsedUrl.pathname.indexOf("/classes/") !== -1) {
     if (request.method === "GET"){
        exports.handleGet(response, parsedUrl.query, headers);
     } else if (request.method === "POST") {
        exports.handlePost(request, response, headers);
     } else if (request.method === "OPTIONS") {
        response.writeHead(200, headers);
        response.end();
     } else {
        response.writeHead(404, headers);
        response.end("Nope.");
     }
   } else {
    response.writeHead(404, headers);
    response.end("Nope.");
   }
};


exports.handleGet = function(res, query, headers){
  var rv = exports.data;

  res.writeHead(200, headers);

  if (query["order"]) {
    var direction = '+';
    var key = query["order"];
    if (key[0] === '-') {
      direction = '-';
      key = key.slice(1);
    }

    exports.data.results.sort(function(a, b) {
      if (direction === '+') {
        a[key] - b[key];
      } else {
        b[key] - a[key];
      }
    });
  }

    // we're hardcoding the roomname key
    // deal
  if (query["where[roomname]"]) {
    var val = query["where[roomname]"];
    var data = _.filter(exports.data.results, function(item) {
      return (item["roomname"] == val);
    });
    rv = {results: data};
  }

  res.end(JSON.stringify(rv));
};

exports.handlePost = function(req, res, headers){
  var received = "";
  req.on("data", function(input){
    received += input;
  });
  req.on("end", function(){
    res.writeHead(201, headers);
    var rv = JSON.parse(received);
    rv["createdAt"] = new Date();
    exports.data.results.push(rv);
    fs.writeFile("./data.json", JSON.stringify(exports.data), function(err){
      if (err){ throw err }
    });
    res.end();
  });
}



/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
