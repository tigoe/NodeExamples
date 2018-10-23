/*
A  chat client in node.js.
Connects to a TCP socket server. Sends anything
typed on the keyboard to the server. If the server sends an
'end' event, the program stops.

To start it, give it a server address and a port number

created 25 Jan 2015
modified 7 Sept 2017
by Tom Igoe
*/
// make an instance of the net library:
const net = require('net');	
// make a new instance of the socket class:			
var client = new net.Socket();		
// input string from the keyboard (STDIN):	
var input = '';			
// get the server address from the command line:				
var serverAddress = process.argv[2];
// get the port number from the command line
var portNumber = process.argv[3];		

// make sure the server address, and the port number are filled in:
if (!serverAddress || !portNumber) {
	console.log("To run this program, you need to give the server IP address and the port number, like so:\n");
	console.log("node serialSocketClient.js <ipAddress> <portNumber>\n\n");
	process.exit(0);
}

var stdin = process.openStdin();	 // enable input from the keyboard
stdin.setEncoding('utf8');			 // encode everything typed as a string
client.setEncoding('utf8');	 // encode everything sent by the client as a string

client.connect(portNumber, serverAddress, login);	// connect to the server

// client event handlers:
client.on('data', printIncoming);	// if there's incoming data in the socket
client.on('end', endClient);			// if the socket ends from the remote side
client.on('close', endClient);		// if the socket ends from the local side

// this function runs when the client successfully connects:
function login() {
	console.log('Connected');
	client.write('Hello ' + client.localAddress);	// send a hello and your address
}

// this function runs if there's input from the keyboard.
// you need to hit enter to generate this event.
stdin.on('data', function(data) {
	client.write(data);							// send it to the server
});

// this function runs if there's incoming data from the socket:
function printIncoming(data) {
	data = data.trim();										// trim any whitespace from the string
	console.log('Server said: ' + data);	// print the message
}

// this function runs if the socket is closed:
function endClient() {
	console.log('Connection closed');
	process.exit(0);
}
