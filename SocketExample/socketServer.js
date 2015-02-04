/*
	socketServer.js	
	
	A simple chat server in node.js. 
	Prints all client text to the console. Keeps track of clients
	in an array. Typing 'c' will print the array of clients
	
	created 25 Jan 2015
	by Tom Igoe
*/

var net = require('net'),				// make an instance of the net library
	clients = new Array,					// array to track clients when they connect
 	input = '';								// input string from the keyboard (STDIN)

var stdin = process.openStdin();		// enable input from the keyboard
stdin.setEncoding('utf8');				// encode everything typed as a string
 
var server = net.createServer(listenForClients);	// create the server

// This function is called every time a new client connects:
function listenForClients(client) {
	console.log('client connected');		
	client.setEncoding('utf8');	// encode everything sent by the client as a string
	client.write('hello');			// send the client a hello message
	clients.push(client);			// append the client to the array of clients
	
	// this function runs if the client sends an 'end' event: 
	client.on('end', function() {
   	console.log('client disconnected');
   	var position = clients.indexOf(client);	// get the client's position in the array
   	clients.splice(position, 1);					// delete it from the array
  	});
  	
  	// this function runs if the client sends data:
  	client.on('data', function(data) {
	  	data = data.trim();						// trim any whitespace from the string
   	console.log(data);			
   	if (data === 'x') {					   // if the client sends 'exit',
			console.log('closing client');
			client.end();							// disconnect the client
		}
  	});
  
  // this function runs if there's input from the keyboard.
  // you need to hit enter to generate this event.
  stdin.on('data', function(data) { 
	  	data = data.trim();						// trim any whitespace from the string
	  	if (data === 'c') {
		  	console.log(clients);				// list the client array
	  	} else {										// otherwise, broadcast the message to all clients
		  	for (thisClient in clients) {		// iterate over the client array
				clients[thisClient].write(data);		// send the message to each client
			}
		}
	});
}
 
// start the server listening:
server.listen(8080);