/*
	Lists serial ports. Copied from https://github.com/voodootikigod/node-serialport readme
	
	refactored to get rid of anonymous functions, to make it clearer for
	those new to JavaScript
*/

  var serialport = require("serialport");
  var SerialPort = serialport.SerialPort; // localize object constructor

// list serial ports:
serialport.list(listPorts);

function listPorts(err, ports) {
    ports.forEach(printPort);
    
    function printPort(port) {
      console.log(port.comName + "\t" + port.manufacturer);
    }
  }