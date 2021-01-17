/*
	Express.js example
	Shows how handle GET, POST, PUT, DELETE in Express.js 4.0

  Try this with curl as follows:
  $ curl -X GET http://localhost:8080
  $ curl -X POST http://localhost:8080
  $ curl -X PUT http://localhost:8080
  $ curl -X DELETE http://localhost:8080

  Add any body content you want to the POST or PUT requests using urlencoded
  strings like so:
  $ curl -X POST http://localhost:8080 -d 'parameter=value&param2=value2'

	created 14 Feb 2016
  modified 4 Feb 2018
	by Tom Igoe
*/

var express = require('express');			// include express.js
var server = express();						      // a local instance of it
var bodyParser = require('body-parser');	// include body-parser

// you need a  body parser:
server.use(bodyParser.urlencoded({extended: false})); // for application/x-www-form-urlencoded

// this runs after the server successfully starts:
function serverStart() {
  var port = this.address().port;
  console.log('Server listening on port '+ port);
}

function handleRequests(request, response) {
	console.log('Got a ' + request.method + ' request');
	// the parameters of a GET request are passed in
	// request.body. Pass that to formatResponse()
	// for formatting:
  console.log(request.headers);
  if (request.method == 'GET') {
    console.log(request.query);
  } else {
    console.log(request.body);
  }

	// send the response:
	response.send('OK');
	response.end();
}

// start the server:
server.listen(process.env.PORT || 8080, serverStart);
// request listener for all types of requests:
server.all('/*', handleRequests);
