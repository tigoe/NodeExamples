/*
	SerialSocketClient.js	
	
	A simple serial-to-chat client in node.js. 
	Connects to a TCP socket server on port 8080. Sends messages
	that comes in the serial port to the server if the client
	is connected.

	
	You can use this with the socketServer example found here:
	https://github.com/tigoe/NodeExamples/blob/master/SocketExample/socketServer.js

	You can also use the Arduino serial client found here:
	https://github.com/tigoe/NodeExamples/blob/master/SerialSocketExample/SerialJoystickClient/SerialJoystickClient.ino
	
	created 25 Jan 2015
	modified 3 Feb 2015
	by Tom Igoe
*/

var net = require('net'),				// make an instance of the net library
	client,									// make a new instance of the socket class
	input = '';								// input string from the keyboard (STDIN)

var serialport = require("serialport"),	// include the serialport library
	SerialPort  = serialport.SerialPort,	// make a local instance of it
	portName = process.argv[2];				// get the serial port name from the command line
	serverAddress = process.argv[3], 		// get the server address from the command line
	portNumber = process.argv[4];				// get the port number from the command line

var connected = false;							// if client is connected

// make sure the port name, the server address, and the port number are all filled in:
if (!portName || !serverAddress || !portNumber) {
	console.log("To run this program, you need to give the serial port name,"); 
	console.log("The server IP address, and the port number, like so:\n");
	console.log("node serialSocketClient.js <serialPort> <ipAddress> <portNumber>\n\n");
	process.exit(0);
}

// open the serial port. The portname comes from the command line:
var myPort = new SerialPort(portName, { 
	baudRate: 9600 //,
	// look for return and newline at the end of each data packet.
	// if your serial device doesn't send carriage return and newline, 
	// comment this line out (and the comma after 9600 above):
	//parser: serialport.parsers.readline("\r\n")
});

	
// called when the serial port opens:
myPort.on('open', function() {
	console.log('port open');
	console.log('baud rate: ' + myPort.options.baudRate);

	// called when there's new incoming serial data:  
	myPort.on('data', function(data) {		
		if (connected) {
			client.write(data);
		}
		
		// run through all the bytes in the incoming data string:
		for (var c=0; c<data.length; c++) {
			// convert each byte to its unicode character:
			var thisByte = String.fromCharCode(data[c]);
			console.log(thisByte);
			// if the byte is x and you're not connected, connect:
			if (thisByte === 'x' && !connected) {
				console.log("I am connecting");
				// connect to the server:
				client = new net.Socket(),
				client.connect(portNumber, serverAddress, login);
			} 
		}
	
		// this function runs when the client successfully connects:
		function login() {
			client.setEncoding('utf8');	// encode everything sent by the client as a string
			console.log('Connected');
			connected = true;
		
		  	// this function runs if the server sends data:
			client.on('data', function(data) {
				data = data.trim();							// trim any whitespace from the string
				console.log('Server said ' + data);
				// only send hi or bye on to the client, since Arduino code
				// doesn't look for other messages:
				if (data === 'hi' || data === 'bye') {
					myPort.write(data);
				}
			});
			
		  	// this function runs if the client ends from the server:	
			client.on('end', function() {
				console.log('client ended');
				connected = false;
			});
			
			// this function runs after the client end event:
			client.on('close', function() {
				console.log('Connection closed');
				connected = false;
				// eliminate any reference to the client,
				// so you can re-create it on next connect:
				client = null;
			});
		}
	});
});

// called when the serial port closes:
myPort.on('close', function() {
	console.log('port closed');		
});

// called when there's an error with the serial port:
myPort.on('error', function(error) {
	console.log('there was an error with the serial port: ' + error);
	myPort.close();
});
