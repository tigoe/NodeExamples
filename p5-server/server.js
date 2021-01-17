/*
  minimal p5.js server
  serves static files from a folder called public
  and responds to a GET request

  created May 2016
  by Tom Igoe
*/

var express = require('express');         // include the express library
var server = express();                   // create a server using express
server.use('/',express.static('public')); // serve static files from /public

// respond to GET requests:
function respondToClient(request, response) {
  // make a response JSON object to send:
  var responseBody = {
    name: request.params.name
  }
  // check the age of the client:
  if (request.params.age > 21) {
    // add a comment to the response body:
    responseBody.comment = 'You are old enough to have a drink.';
  } else {
    responseBody.comment = 'stay away from the bar';
  }
  // send the response:
  response.end(JSON.stringify(responseBody));
}

server.listen(process.env.PORT || 8080);              // start the server
server.get('/name/:name/age/:age', respondToClient);  // listen for GET requests
