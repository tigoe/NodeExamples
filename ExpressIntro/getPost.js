/*
	Express.js GET/POST example
	Shows how to get the parameters of a GET vs a POST request
	in Express.js 4.0

	created 10 Feb 2015
  modified 4 Feb 2018
	by Tom Igoe
*/

var express = require('express');			    // include express.js
var server = express();						        // a local instance of it
var bodyParser = require('body-parser');	// include body-parser
server.use('/',express.static('public')); // serve static files from /public

// you need a couple of parsers for the body of a POST request:
server.use(bodyParser.json()); 						  // for  application/json
server.use(bodyParser.urlencoded({extended: false})); // for application/x-www-form-urlencoded

// this runs after the server successfully starts:
function serverStart() {
  var port = this.address().port;
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

function handleGet (request, response) {
	console.log('got a GET request');
	// the parameters of a GET request are passed in
	// request.query. Pass that to formatResponse()
	// for formatting:
	var content = formatResponse(request.query);
	console.log(content);

	// send the response:
	response.send(content);
	response.end();
}

function handlePost(request, response) {
	console.log('Got a POST request');
	// the parameters of a GET request are passed in
	// request.body. Pass that to formatResponse()
	// for formatting:
	var content = formatResponse(request.body);
	console.log(content);

	// send the response:
	response.send(content);
	response.end();
}

// this is the callback function for when the client
// requests the date (a dynamic route):
function handleDate(request, response) {
	console.log('got a GET request');
	// send the response:
  var now = new Date();
	response.send("Date: " + now + "\n");
	response.end();
}

// start the server:
server.listen(8080, serverStart);
server.get('/data', handleGet);    // GET request listener
server.get('/date', handleDate);   // GET request listener
server.post('/data', handlePost);  // POST request listener
