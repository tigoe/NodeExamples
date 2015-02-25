/*
	Socket.io example
	
	Shows how to make a basic webSocket connection between a client and a server
	using Socket.io version 1.0 or later (http://socket.io/)
	The client uses p5.js (http://p5js.org/) to generate its UI and handle user events
	
	created 13 Jan 2015
	modified 24 Feb 2015
	by Tom Igoe
*/

var express = require('express');		// include express.js
var app = express();					// make an instance of express.js
var http = require('http').Server(app);	// include http and make a server instance with the express instance
var io = require('socket.io')(http);	// include socket.io and make a socket server instance with the http instance

// send the index page if you get a request for / :
app.get('/', sendIndex);

// callback function for 'get /' requests:
function sendIndex(request, response){
	response.sendFile(__dirname + '/index.html');
}

io.on('connection', function(socket){
	console.log('a user connected');
	console.log(socket.handshake.address);
	// send something to the web client with the data:
	socket.emit('message', "Hello, " + socket.handshake.address);
	socket.on('message', function(data) {
		console.log('received from client: ' + data);

		// This function sends the time out an open socket:
		function sendTime() {
			var message = "Time and date from the server: " + new Date();
			socket.emit('message',message);
		}
		// when a socket's open, send the time once a second:
		setInterval(sendTime, 1000);
	}); 
});

// listen for incoming server messages:
http.listen(8080, function(){
  console.log('listening on port 8080');
});