/*
A  simple TCP  chat  server in node.js.
Minimal code for listening for clients.  
Prints out what the clients say. 
Echoes back to each client.

created 22 Oct 2018
by Tom Igoe
*/

// make an instance of the net library:
const net = require('net');
// create the server:
var server = net.createServer(listenForClients);
// start the server listening:
server.listen(8080);

// This function is called every time a new client connects:
function listenForClients(client) {
    console.log('client connected at ' + new Date());
    console.log('client: ' + client.remoteAddress);
   // client.setEncoding('utf8');   // encode everything sent by the client as a string
    client.write('hello');        // send the client a hello message

    function readIncoming(data) {
        console.log(client.remoteAddress + ': ' + data); // print what the client said
    }

    // client event handler. runs if there's incoming socket data:
     client.on('data', readIncoming);  
}