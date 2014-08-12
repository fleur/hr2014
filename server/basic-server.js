/* Import node's http module: */
var http = require("http");
var rh = require("./request-handler.js");
var fs = require("fs");



// we're
var port = process.env.PORT || 3000;
// var ip = "127.0.0.1";
if (fs.existsSync("./data.json")){
  var messageData = fs.readFileSync("./data.json", 'utf8');
  rh.initializeData(messageData);
}

/* We use node's http module to create a server. Note, we called it 'server', but
we could have called it anything (myServer, blahblah, etc.). The function we pass it (handleRequest)
will, unsurprisingly, handle all incoming requests. (ps: 'handleRequest' is in the 'request-handler' file).
Lastly, we tell the server we made to listen on the given port and IP. */
var server = http.createServer(rh.handler);
server.listen(port);


