/*
	socketClient.js	
	
	A simple chat client in node.js. 
	Connects to a TCP socket server on port 8001. Sends anything
	typed on the keyboard to the server. If the server sends an 
	'end' event, the program stops.
	
	created 25 Jan 2015
	modified 3 Feb 2015
	by Tom Igoe
*/

var net = require('net'),				// make an instance of the net library
	client = new net.Socket(),			// make a new instance of the socket class
	input = '',								// input string from the keyboard (STDIN)
	serverAddress = process.argv[2], // get the server address from the command line
	portNumber = process.argv[3];		// get the port number from the command line

// make sure the server address, and the port number are filled in:
if (!serverAddress || !portNumber) {
	console.log("To run this program, you need to give the server IP address and the port number, like so:\n");
	console.log("node serialSocketClient.js <ipAddress> <portNumber>\n\n");
	process.exit(0);
}

var stdin = process.openStdin();		// enable input from the keyboard
stdin.setEncoding('utf8');			   // encode everything typed as a string

	
client.connect(portNumber, serverAddress, login);	// connect to the server

// this function runs when the client successfully connects:
function login() {
	client.setEncoding('utf8');	// encode everything sent by the client as a string
	console.log('Connected');
	client.write('Hello ' + client.localAddress);	// send a hello and your address

  	// this function runs if the server sends data:
	client.on('data', function(data) {
		data = data.trim();							// trim any whitespace from the string
		console.log('Server said: ' + data);	// print the message
	});
	
  	// this function runs if the client ends, either locally
  	// or from the server:	
	client.on('end', function() {
		console.log("socket closed"); 
	});
	
	// this function runs if there's input from the keyboard.
	// you need to hit enter to generate this event.
	stdin.on('data', function(data) {
		client.write(data);							// send it to the server
	});
}
 
// when the client closes, stop the program:
client.on('close', function() {
	console.log('Connection closed');
	process.exit(0);
});