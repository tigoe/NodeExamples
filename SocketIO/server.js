/*
	Socket.io example
	
	Shows how to make a basic webSocket connection between a client and a server
	using Socket.io version 1.0 or later (http://socket.io/)
	The client uses p5.js (http://p5js.org/) to generate its UI and handle user events
	
	created 13 Jan 2015
	by Tom Igoe
	
*/


var express = require('express');			// include express.js
var app = express();								// make an instance of express.js
var http = require('http').Server(app);	// include http and make a server instance with the express instance
//var io = require('socket.io')(http);		// include socket.io and make a socket server instance with the http instance

// send the index page if you get a request for / :
app.get('/', sendIndex);

app.get('/*', respondToClient);

// callback function for 'get /' requests:
function sendIndex(request, response){
	response.sendFile(__dirname + '/index.html');
}

function respondToClient(request, response) {  

	console.log("request from: ");
	console.log(request.connection.remoteAddress);
	
	console.log("headers:");
	console.log(request.headers);
	
	console.log("URL:");
	console.log(request.url);

	
	// if you got a POST request, here's the body
	request.on('data', function(body) {
		console.log("Body of request:");
		console.log(body.toString());
	});
	
	// write back to the client:
	response.writeHead(200, {"Content-Type": "text/html"});  
	response.write("Hello, " + request.connection.remoteAddress);
	response.write("hits: " + hitCount);
	response.end();
	// increment the hit counter:
	hitCount++;
};


// listen for incoming server messages:
http.listen(8080, function(){
  console.log('listening on port 8080');
});