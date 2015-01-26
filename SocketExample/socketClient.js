/*
	socketClient.js	
	
	A simple chat client in node.js. 
	Connects to a TCP socket server on port 8001. Sends anything
	typed on the keyboard to the server. If the server sends an 
	'end' event, the program stops.
	
	created 25 Jan 2015
	by Tom Igoe
*/

var net = require('net'),				// make an instance of the net library
	client = new net.Socket(),			// make a new instance of the socket class
	input = '';								// input string from the keyboard (STDIN)

var stdin = process.openStdin();		// enable input from the keyboard
stdin.setEncoding('utf8');			   // encode everything typed as a string

	
client.connect(8001, '127.0.0.1', login);	// connect to the server on localhost

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
		client.destroy();				// destroy the connection 
	});
	
	// this function runs if there's input from the keyboard.
	// you need to hit enter to generate this event.
	stdin.on('data', function(data) {
		 data = data.trim()							// trim any whitespace from the string
		client.write(data);							// send it to the server
	});
}
 
// when the client closes, stop the program:
client.on('close', function() {
	console.log('Connection closed');
	process.exit(0);
});