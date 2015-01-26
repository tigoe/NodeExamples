/*
	SerialSocketClient.js	
	
	A simple serial-to-chat client in node.js. 
	Connects to a TCP socket server on port 8001. Sends anything
	that comes in the serial port to the server. If the server sends an 
	'end' event, the program stops.
	
	You can use this with the socketServer example found here:
	https://github.com/tigoe/NodeExamples/blob/master/SocketExample/socketServer.js
	
	created 25 Jan 2015
	by Tom Igoe
*/

var net = require('net'),				// make an instance of the net library
	client = new net.Socket(),			// make a new instance of the socket class
	input = '';								// input string from the keyboard (STDIN)

var serialport = require("serialport"),	// include the serialport library
	SerialPort  = serialport.SerialPort,	// make a local instance of it
	portName = process.argv[2];				// get the serial port name from the command line

// open the serial port. The portname comes from the command line:
var myPort = new SerialPort(portName, { 
	baudRate: 9600,
	// look for return and newline at the end of each data packet.
	// if your serial device doesn't send carriage return and newline, 
	// comment this line out (and the comma after 9600 above):
	parser: serialport.parsers.readline("\r\n")
});

	
// called when the serial port opens:
myPort.on('open', function() {
	console.log('port open');
	console.log('baud rate: ' + myPort.options.baudRate);
	// connect to the server on localhost:
	client.connect(8001, '127.0.0.1', login);	

	
	// this function runs when the client successfully connects:
	function login() {
		client.setEncoding('utf8');	// encode everything sent by the client as a string
		console.log('Connected');
		client.write('Hello ' + client.localAddress);	// send a hello and your address
	
	  	// this function runs if the server sends data:
		client.on('data', function(data) {
			data = data.trim();							// trim any whitespace from the string
			console.log('Server said: ' + data);	// print the message
			myPort.write(data);
		});
		
	  	// this function runs if the client ends, either locally
	  	// or from the server:	
		client.on('end', function() {
			client.destroy();				// destroy the server connection 
		});
		
		// called when there's new incoming serial data:  
		myPort.on('data', function (data) {
			// send the serial data to the server:
			client.write(data);
		});

	}
});

// called when the serial port closes:
myPort.on('close', function() {
	console.log('port closed');
	client.destroy();				// destroy the server connection			
});

// called when there's an error with the serial port:
myPort.on('error', function(error) {
	console.log('there was an error with the serial port: ' + error);
	myPort.close();
});


// when the client closes, stop the program:
client.on('close', function() {
	console.log('Connection closed');
	process.exit(0);
});