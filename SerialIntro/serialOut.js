/*
	serialOut.js
	
	Tests the functtionality of the serial port library.
	To be used in conjunction with the Arduino sketch called AsciiSerialRead.ino
	
	This script sends a number out the serial port
	every second.
	
	To call this from the command line:

	node serialTest.js portname
	 
	where portname is the path to the serial port.
	
	refactored to get rid of anonymous functions, to make it clearer for
	those new to JavaScript
	
	created 17 June 2014
	modified 29 Jan 2015
	by Tom Igoe

*/


var serialport = require("serialport"),	// include the serialport library
	SerialPort  = serialport.SerialPort,	// make a local instance of it
	portName = process.argv[2];				// get the serial port name from the command line
	
	var brightness = 0;

// open the serial port. The portname comes from the command line:
var myPort = new SerialPort(portName, { 
	baudRate: 9600,
	// look for return and newline at the end of each data packet:
	parser: serialport.parsers.readline('\r\n')
});
 
myPort.on('open', listen);			// called when the serial port opens
myPort.on('close', closePort);	// called when the serial port closes
myPort.on('error', serialError);	// called when there's an error with the serial port

function listen() {
	console.log('port open');
	console.log('baud rate: ' + myPort.options.baudRate);
	
	// since you only send data when the port is open, this function 
	// is local to the listen() function:
	function sendData() {
	// convert the value to an ASCII string before sending it:
		myPort.write(brightness.toString());
		console.log("Sending " + brightness + " out the serial port");
		// increment brightness by 10 points. Rollover if > 255:
		if (brightness < 255) {
			brightness+= 10;
		} else {
			brightness = 0;
		}	
	}
	// set an interval to update the brightness 10 times per second:
	setInterval(sendData, 100);
}

function closePort() {
	console.log('port closed');
}

function serialError(error) {
	console.log('there was an error with the serial port: ' + error);
	myPort.close();
}