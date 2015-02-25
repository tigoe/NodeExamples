/*
	Socket.io example
	
	Shows how to make a basic webSocket connection between a client and a server
	using Socket.io version 1.0 or later (http://socket.io/)
	You can type back to the clients from the command line.
	The client uses p5.js (http://p5js.org/) to generate its UI and handle user events
	
	created 24 Jan 2015
	by Tom Igoe
*/

var express = require('express');		// include express.js
var app = express();					// make an instance of express.js
var http = require('http').Server(app);	// include http and make a server instance with the express instance
var io = require('socket.io')(http);	// include socket.io and make a socket server instance with the http instance

var stdin = process.openStdin();		// enable input from the keyboard
stdin.setEncoding('utf8');				// encode everything typed as a string

// send the index page if you get a request for / :
app.get('/', sendIndex);

// callback function for 'get /' requests:
function sendIndex(request, response){
	response.sendFile(__dirname + '/index.html');
}

// this is called when there's a websocket connection:
io.on('connection', function(socket){
	console.log('a user connected');
	console.log(socket.handshake.address);
	// send something to the web client with the data:
	socket.emit('message', "Hello, " + socket.handshake.address);
	socket.on('message', function(data) {
		console.log('received from client: ' + data);
	}); 

	// this function runs if there's input from the keyboard.
  	// you need to type enter to generate this event.
  	stdin.on('data', function(data) { 
  		console.log('sending');
	  	data = data.trim();				// trim any whitespace from the string
	  	socket.emit('message', data);	// send the message to each client
	});

});


// listen for incoming server messages:
http.listen(8080, function(){
  console.log('listening on port 8080');
});