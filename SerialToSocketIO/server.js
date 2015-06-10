
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
var io = require('socket.io')				// include socket.io
var app = express();								// make an instance of express.js
var server = app.listen(8080);			// start a server with the express instance
var socketServer = io(server);	 		// make a socket server using the express server

app.use(express.static('public'));	// serve files from the public folder

var serialport = require("serialport"),	// include the serialport library
SerialPort  = serialport.SerialPort,	// make a local instance of serial
portName = process.argv[2];				// get the port name from the command line


// open the serial port. Uses the command line parameter:
var myPort = new SerialPort(portName, {
	baudRate: 9600,
	// look for return and newline at the end of each data packet:
	parser: serialport.parsers.readline('\n')
});

app.get('/:name', serveFiles);								// listener for all static file requests
socketServer.on('connection', newConnection);	// listener for websocket data


function serveFiles(request, response) {
	// get the file name from the request parameter:
	var fileName = request.params.name;
	// send the file:
	response.sendFile(fileName);
}

function newConnection(socket){
	console.log('new user address: ' + socket.handshake.address);
	// send something to the web client with the data:
	socket.emit('message', "Hello, " + socket.handshake.address);

	// this function runs if there's input from the client:
	socket.on('message', function(data) {
		console.log('received from client: ' + data);
	});

	// this function runs if there's input from the serialport:
	myPort.on('data', function(data) {
		// send the data and close the connection:
		socket.emit('message', data);
	});
}
