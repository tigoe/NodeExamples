
// serial port initialization:
var SerialPort = require('serialport');			// include the serialport library
var portName = process.argv[2];						  // get the port name from the command line
var	portConfig = {                          // serial port config
		baudRate: 9600
	};

var express = require('express');           // the express library
var http = require("http");                 // the http library
var WebSocketServer = require('ws').Server; // the ws library's Server class

var server = express();                     // the express server
var httpServer = http.createServer(server); // an http server
var wss = new WebSocketServer({ server: httpServer }); // a websocket server

// serve static files from /public:
server.use('/',express.static('public'));

function openPort() {
	console.log('port open');
	console.log('baud rate: ' + myPort.options.baudRate);
}

function listen(data) {
  if (wss.clients.length > 0) {   // if there are any clients
    broadcast(data.toString());   // send them the data as a string
  }
}

// define the webSocket connection callback function:
function connectClient(newClient) {
  // when a webSocket message comes in from this client:
  function readMessage(data) {
    console.log(data);
  }

  // set up event listeners:
  newClient.on('message', readMessage);
  // acknowledge new client:
  console.log("new client");
}

// broadcast data to connected webSocket clients:
function broadcast(data) {
  for (client in wss.clients) {
      wss.clients[client].send(data);
  }
}
// open the serial port:
var myPort = new SerialPort(portName, portConfig);

myPort.on('open', openPort);			// called when the serial port opens
myPort.on('data', listen);				// called when there's new incoming serial data

// start the servers:
httpServer.listen(8080);                // listen for http connections
wss.on('connection', connectClient);    // listen for webSocket messages
