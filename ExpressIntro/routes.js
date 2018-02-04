/*
	Express.js routes example
	Shows how to respond to different routes
	in Express.js 4.0

	created 10 Feb 2015
	modified 30 Oct 2017
	by Tom Igoe
*/

var express = require('express');	// include express.js
var server = express();				// a local instance of it
var names = ['Andres', 'Bob', 'Carol', 'David', 'Ed', 'Francesca'];


// this runs after the server successfully starts:
function serverStart() {
  var port = this.address().port;
  console.log('Server listening on port '+ port);
}

// this is the handler for the root of the site:
function getRoot (request, response) {
	var content = 'Hello. Would you like to know the name or the age?';
	content += '\n';		    // add a newline at the end of the content
	response.send(content);	// send it back to the client
	response.end();			    // close the connection
}

// this is the handler for /name:
function getName(request, response) {
	var content = 'The name is: ';
	var whichName = Math.floor(Math.random() * names.length);
	var name = names[whichName];
	content += name;
	content += '\n';		// add a newline at the end of the content
	response.send('<h1>' + content + '</h1>');	// send it back to the client
	response.end();			// close the connection
}

// this is the handler for the /age:
function getAge(request, response) {
	var age = parseInt(Math.random() * 75);
	var content = 'The age is: ' ;
	content += age;
	content += '\n';		// add a newline at the end of the content
	response.send(content);	// send it back to the client
	response.end();			// close the connection
}


// start the server:
server.listen(8080, serverStart);
// set route handlers:
server.get('/', getRoot);      // listen for GET /
server.get('/name/', getName); // listen for GET /name
server.get('/age/', getAge);   // listen for GET /age
