/*
A Simple UDP server in node.js.
Listens for incoming UDP messages and nothing else.

created 22 Oct 2018
by Tom Igoe
*/
// include UDP datagram library:
const udp = require('dgram');       
// create UDP socket:
var udpServer = udp.createSocket('udp4');   
// bind the socket server to a port number:
udpServer.bind(8888);                       

// server event handlers:
udpServer.on('listening', announceServer);  
udpServer.on('message', readIncoming);    

function announceServer() {
  var thisServer = udpServer.address();
  console.log('UDP Server listening on ' + thisServer.address + ":" + thisServer.port);
}

// when there's new data, check if the client sending it is in the list.
function readIncoming(data, sender) {
  // print out the client's message:
  console.log(sender.address + ':' + sender.port + ': ' + data);
}