/*
	Express.js requests example
	Responds with a JSON object of the request's
  pertinent characteristics. Useful for running 
  requests against.

  created 9 Jan 2023
	by Tom Igoe
*/
// include express.js and make an instance of it:
const express = require("express");
const server = express();

// body parsers for JSON and URL encoded bodies:
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// this runs after the server successfully starts:
function serverStart() {
  var port = this.address().port;
  console.log("Server listening on port " + port);
}

// this handles all requests:
function handleRequests(request, response) {
  let requestInfo = {};
  // assemble some of the request properties int
  // a response for the client:
  requestInfo.method = request.method;
  requestInfo.ip = request.ip;
  requestInfo.path = request.path;
  requestInfo.queryString = request.query;
  requestInfo.headers = request.headers;
  requestInfo.body = request.body;
  // send them to the client as a JSON response:
  response.json(requestInfo);
}

// start the server:
server.listen(process.env.PORT || 8080, serverStart);
// request listener for all types of requests:
server.all("/*", handleRequests);
