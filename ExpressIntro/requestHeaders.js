/*
	Express.js requestHeaders example
	Shows how to get the headers of a request
	in Express.js 4.0

  Try this with curl as follows:
  $ curl -X GET http://localhost:8080
  $ curl -X POST http://localhost:8080
  $ curl -X PUT http://localhost:8080
  $ curl -X DELETE http://localhost:8080

  created 4 Feb 2018
	by Tom Igoe
*/

var express = require('express');			// include express.js
var server = express();						    // a local instance of it
var bodyParser = require('body-parser');	// include body-parser

// you need a  body parser:
server.use(bodyParser.json()); // for application/x-www-form-urlencoded

// this runs after the server successfully starts:
function serverStart() {
  var port = this.address().port;
  console.log('Server listening on port '+ port);
}

// this handles all requests:
function handleRequests(request, response) {
	console.log('Got a ' + request.method + ' request');
  console.log('client address: ' + request.connection.remoteAddress);
  // print all the headers:
  console.log(" raw headers: " + request.rawHeaders);
  console.log("body: " + JSON.stringify(request.body));

	// send the response:
	response.write('what I know about your client:');
  response.write('client address: ' + request.connection.remoteAddress);
  response.write('request headers:' + request.rawHeaders);
	
  response.end();
}

// start the server:
server.listen(process.env.PORT || 8080, serverStart);
// request listener for all types of requests:
server.all('/*', handleRequests);
