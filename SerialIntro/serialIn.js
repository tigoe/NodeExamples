/*
	serialIn.js
	
	Tests the functtionality of the serial port library
		To be used in conjunction with the Arduino sketch called AnalogReadSerial.ino,
		which can be found under File -> Examples ->01.Basics -> AnalogReadSerial in 
		the Arduino IDE

	This script expects a steady stream of input
	from the serial port separated by carriage return and newline characters (\r\n).
	
	To call this from the command line:
	
	node serialTest.js portname
	 
	where portname is the path to the serial port.
	
	refactored to get rid of anonymous functions, to make it clearer for
	those new to JavaScript
	
	created 21 Aug 2012
	modified 29 Jan 2015
	by Tom Igoe

*/

var serialport = require("serialport"),	// include the serialport library
	SerialPort  = serialport.SerialPort,	// make a local instance of it
	portName = process.argv[2];				// get the serial port name from the command line

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
	myPort.on('data', printIncoming);	// called when there's new incoming serial data
	
	// you only need this function if your port is open,
	// so it's local to the listen() function:
	function printIncoming(data) {
		console.log(data);
	}
}

function closePort() {
	console.log('port closed');
}

function serialError(error) {
	console.log('there was an error with the serial port: ' + error);
	myPort.close();
}