
/*
Serial to Socket.io example

Shows how to make a basic webSocket connection between a client and a server
using Socket.io version 1.0 or later (http://socket.io/)
Takes data from the command line to drive a graphic
generated in  p5.js (http://p5js.org/)

created 10 Jun 2015
by Tom Igoe
*/

var express = require('express');		// include express.js
var app = express();					// make an instance of express.js
var http = require('http').Server(app);	// include http and make a server instance with the express instance
var io = require('socket.io')(http);	// include socket.io and make a socket server instance with the http instance

app.use(express.static('public'));

var serialport = require("serialport"),	// include the serialport library
SerialPort  = serialport.SerialPort,	// make a local instance of serial
portName = process.argv[2];				// get the port name from the command line


// send the index page if you get a request for / :
app.get('/files/:name', serveFiles);	// GET handler for all static files


// open the serial port. Uses the command line parameter:
var myPort = new SerialPort(portName, {
	baudRate: 9600,
	// look for return and newline at the end of each data packet:
	parser: serialport.parsers.readline('\n')
});

function serveFiles(request, response) {
	// get the file name from the request parameter:
	var fileName = request.params.name;
	// send the file:
	response.sendFile(fileName);
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

	// this function runs if there's input from the serialport:
	myPort.on('data', function(data) {
		// send the data and close the connection:
		socket.emit('message', data);
	});
});


// listen for incoming server messages:
http.listen(8080, function(){
	console.log('listening on port 8080');
});
