/*
	Express.js REST parameters example
	Shows how to take values in a RESTful way
	in Express.js 4.0

	This does no checking on the data sent, it just takes
	the values in and adds them to arrays.

	created 10 Feb 2015
  modified 4 Feb 2018
	by Tom Igoe
*/

var express = require('express');	// include express.js
var server = express();							// a local instance of it
var names = [];										// an array for name values from the client
var ages = [];										// an array of age values from the client

// this runs after the server successfully starts:
function serverStart() {
  var port = this.address().port;
  console.log('Server listening on port '+ port);
}

// this is the handler for the root of the site:
function getRoot(request, response) {
	var content = 'Hello. Would you like to know the name or the age?';
	content += '\n';			// add a newline at the end of the content
	response.send(content);	// send it back to the client
	response.end();			// close the connection
}

// this is the handler for /name with a parameter:
function setName(request, response) {
	var content = 'The name you gave me is: ';
	var name = request.params.name;
	names.push(name);
	content += name;
	content += '\n';			// add a newline at the end of the content
	response.send(content);	// send it back to the client
	response.end();			// close the connection
}

// this is the handler for /name:
function getName(request, response) {
	var content = 'The last name you gave me is: ';
	var name = names[names.length -1];
	content += name;
	content += '\n';			// add a newline at the end of the content
	response.send(content);	// send it back to the client
	response.end();			// close the connection
}

// this is the handler for /names:
function getNames(request, response) {
	var content = 'The names are: ';
	content += names;
	content += '\n';			// add a newline at the end of the content
	response.send(content);	// send it back to the client
	response.end();			// close the connection
}

// this is the handler for the /age with a parameter:
function setAge(request, response) {
	var content = 'The age you gave me is: ' ;
	var age = request.params.age;
	ages.push(age);
	content += age;
	content += '\n';			// add a newline at the end of the content
	response.send(content);	// send it back to the client
	response.end();			// close the connection
}

// this is the handler for /age:
function getAge(request, response) {
	var content = 'The last age you gave me is: ';
	var age = ages[ages.length -1];
	content += age;
	content += '\n';			// add a newline at the end of the content
	response.send(content);	// send it back to the client
	response.end();			// close the connection
}

// this is the handler for the /ages:
function getAges(request, response) {
	var content = 'The ages are: ' ;
	content += ages;
	content += '\n';			// add a newline at the end of the content
	response.send(content);	// send it back to the client
	response.end();			// close the connection
}

// start the server:
server.listen(process.env.PORT || 8080, serverStart);
server.get('/', getRoot);          // GET the root of the site
server.get('/age/', getAge);       // GET the last age submitted
server.get('/ages/', getAges);     // GET all ages
server.get('/age/:age', setAge);   // GET to set an age
server.get('/name/', getName);     // GET the last name given
server.get('/names/', getNames);   // GET all names
server.get('/name/:name', setName);// GET to set a name
