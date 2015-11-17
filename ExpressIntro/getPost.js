/*
	Express.js GET/POST example
	Shows how to get the parameters of a GET vs a POST request
	in Express.js 4.0

	created 10 Feb 2015
	by Tom Igoe
*/

var express = require('express');			// include express.js
var app = express();						// a local instance of it
var bodyParser = require('body-parser');	// include body-parser

// you need a couple of parsers for the body of a POST request:
app.use(bodyParser.json()); 						// for  application/json
app.use(bodyParser.urlencoded()); // for application/x-www-form-urlencoded

// this runs after the server successfully starts:
function serverStart() {
  var port = server.address().port;
  console.log('Server listening on port '+ port);
}

// this is called by both GET and POST handlers,
// to format a response to the request:
function formatResponse(thisContent) {
	var result = 'You sent me:' +
  			'\n name: ' + thisContent.name +
  			'\n age: ' + thisContent.age + '\n';
  	return result;
}

// this is the GET handler:
app.get('/', function (request, response) {
	console.log('got a GET request');
	// the parameters of a GET request are passed in
	// request.query. Pass that to formatResponse()
	// for formatting:
	var content = formatResponse(request.query);
	console.log(content);

	// send the response:
	response.send(content);
	response.end();
});

// accept POST request on the homepage
app.post('/', function (request, response) {
	console.log('Got a POST request');
	// the parameters of a GET request are passed in
	// request.body. Pass that to formatResponse()
	// for formatting:
	var content = formatResponse(request.body);
	console.log(content);

	// send the response:
	response.send(content);
	response.end();
});

// start the server:
var server = app.listen(8080, serverStart);
