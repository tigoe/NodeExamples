/*
	Express.js requestHeaders example
	Shows how to get the headers of a request
	in Express.js 4.0

  Try this with curl as follows:
  $ curl -X GET https://tigoe-request-headers.glitch.me/
  $ curl -X POST https://tigoe-request-headers.glitch.me/
  $ curl -X PUT https://tigoe-request-headers.glitch.me/
  $ curl -X DELETE https://tigoe-request-headers.glitch.me/

  created 4 Feb 2018
  updated 8 Jan 2023
	by Tom Igoe
*/

var express = require('express');			// include express.js
var server = express();						    // a local instance of it

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
  console.log(request.rawHeaders);

	// send the response:
	response.write('what I know about your client: ');
  response.write('\nclient address: ' + request.connection.remoteAddress);
  response.write('\nrequest headers: ' + request.rawHeaders);
	response.end();
}

// start the server:
server.listen(8080, serverStart);
// request listener for all types of requests:
server.all('/*', handleRequests);
