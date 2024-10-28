/*
	Express.js GET/POST example
	Shows how to get the parameters of a GET vs a POST request
	in Express.js 4.0

	The current version (10/28/24)saves any valid JSON data from the client
	to an array, and serves that array with a new route, /database

	created 10 Feb 2015
  modified 28 Oct 2024
	by Tom Igoe
*/

var express = require('express');			    // include express.js
var server = express();						        // a local instance of it
var database = new Array();								// an array to hold data
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
  var result = "";
  // see if there's any data in the request:
  if (Object.keys(thisContent).length == 0) {
    result = "you sent me nothing";
  } else {
		// you have good data. Add it to an array:
		database.push(thisContent);
    result = 'You sent me:';
    for (item in thisContent) {
      result += `${item}: ${thisContent[item]}`;
      result += " ";
    }
  }
  return result;
}

function handleGet (request, response) {
	console.log('request path: ' + request.url);
	console.log('request type: ' + request.method);
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
	console.log('request path: ' + request.url);
	console.log('request type: ' + request.method);
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
	console.log('request path: ' + request.url);
	console.log('request type: ' + request.method);
	// send the response:
  var now = new Date();
	response.send("Date: " + now + "\n");
	response.end();
}

// this is the callback function for when the client
// requests the data from the database:
function handleDataRequest(request, response) {
	console.log('got a GET request');
	// send the database array:
	response.send(database);
	response.end();
}

// start the server:
server.listen(process.env.PORT || 8080, serverStart);
// to call this: curl localhost:8080/data?key=value
server.get('/data', handleGet);    // GET request listener
// to call this: curl localhost:8080/date
server.get('/date', handleDate);   // GET request listener
// to call this: curl -H 'Content-Type:application/json' -d '{"key":5}' localhost:8080/data
server.post('/data', handlePost);  // POST request listener
// to call this: curl localhost:8080/database
server.get('/database', handleDataRequest);  // GET request listener
