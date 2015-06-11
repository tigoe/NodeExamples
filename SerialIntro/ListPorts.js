/*
Lists serial ports.
Copied from https://github.com/voodootikigod/node-serialport readme

refactored to get rid of anonymous functions, to make it clearer for
those new to JavaScript
*/

var serialport = require("serialport");

// list serial ports:
serialport.list(listPorts);

function listPorts(error, ports) {
	ports.forEach(printPort);

	function printPort(port) {
		console.log(port.comName + "\t" + port.manufacturer);
	}
}
