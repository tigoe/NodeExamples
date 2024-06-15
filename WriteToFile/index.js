/*
	nodeToFile
	a node.js app to read take requests and send as serial data
	
	Shows how to write to a file on the server from node.
	This example is very basic, and doesn't include 
	security checks, so use with caution.
		
	created 10 Dec 2013 
	modified 15 Jun 2024
	by Tom Igoe
	
*/
let express = require('express'),		// using the express framework
	fs = require('fs'),						// and the filesystem library	
	url = require('url');					// and the URL library
let server = express();							// initalize express
let currentData = {};						// set up a variable to hold the data

server.use(express.urlencoded({ extended: true })); 			// use express' urlencoded middleware
server.use('/', express.static('public')); // serve static files from /public
server.listen(8080);								// listen for new requests

// respond to GET request for data
server.get('/data', function (request, response) {
	// the file to the data file on the server:
	var filePath = './data.json';

	/* read the file  asynchronously.
		 the second parameter of readFile is 
		 the callback function that's called when
		 readFile completes:
	 */
	fs.readFile(filePath, function (error, data) {
		// if something goes wrong, throw an error:
		if (error) throw error;

		// if you have a successful file read, print it
		// to the client:
		response.writeHead(200, { 'Content-Type': 'text/html' });
		response.write("Here's what's in the data.json file: <br>");
		response.write(data.toString());
		response.write("<br><a href=\"/\">Return to form</a>");
		response.write("<br><a href=\"/data\">See all the data</a>");
		response.end();
	});
});

// respond to POST request to update data:
server.post('/post', function (request, response) {
	// because you're using the urlencoded middleware,
	// you can ask for pieces of the request like this:
	currentData.name = request.body.name;
	currentData.duration = request.body.duration;

	// get the path to the data file: 
	var filePath = './data.json';
	// convert the data, currently a JSON object, to a string:
	var dataString = JSON.stringify(currentData) + '\n';

	// this function is called by by the writeFile and appendFile functions 
	// below:
	function fileWriteResponse() {
		response.writeHead(200, { 'Content-Type': 'text/html' });
		response.write("You wrote the following to the data file: <br>");
		response.write(dataString);
		response.write("<br><a href=\"/\">Return to form</a>");
		response.write("<br><a href=\"/data\">See all the data</a>");
		response.end();
	}
	/* 
		 write to the file asynchronously. THe third parameter of 
		 writeFile is the callback function that's called when
		 you've had a successful write. 
	*/
	fs.exists(filePath, function (exists) {
		if (exists) {
			fs.appendFile(filePath, dataString, fileWriteResponse);
		} else {
			fs.writeFile(filePath, dataString, fileWriteResponse);
		}
	});
});