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
modified 10 Jun 2015
by Tom Igoe

*/

// serial port initialization:
var serialport = require('serialport'),			// include the serialport library
	SerialPort  = serialport.SerialPort,			// make a local instance of serial
	portName = process.argv[2],								// get the port name from the command line
	portConfig = {
		baudRate: 9600,
		// call myPort.on('data') when a newline is received:
		parser: serialport.parsers.readline('\n')
	};

// open the serial port:
var myPort = new SerialPort(portName, portConfig);

myPort.on('open', openPort);			// called when the serial port opens
myPort.on('close', closePort);		// called when the serial port closes
myPort.on('error', serialError);	// called when there's an error with the serial port
myPort.on('data', listen);				// called when there's new incoming serial data

function openPort() {
	console.log('port open');
	console.log('baud rate: ' + myPort.options.baudRate);
}

function closePort() {
	console.log('port closed');
}

function serialError(error) {
	console.log('there was an error with the serial port: ' + error);
	myPort.close();
}

function listen(data) {
	console.log(data);
}
