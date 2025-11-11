var express = require('express');	// include the express library
var server = express();			// create a server using express
//server.use('/',express.static('public')); // serve static files from /public

function serverStart() {
  console.log("hello I am running");
}

function handleGarden(request, response) {
  console.log(request);
  response.send("Here's a garden!");
  response.end();
}

server.listen(8080, serverStart);  // start the server
server.get("/garden", handleGarden);
