/*
UDP server.js

A UDP socket server in node.js.
Tracks remote clients in a list called clients. If a client sends an x,
it's removed from the list.

created 27 Jun 2015
modified 7 Sept 2017
by Tom Igoe
*/

var udp = require('dgram');         // include UDP datagram functions
var clients = new Array;            // array to track clients when they connect
var input = '';                     // input string from the keyboard (STDIN)

var stdin = process.openStdin();    // enable input from the keyboard
stdin.setEncoding('utf8');          // encode everything typed as a string

// this function runs if there's input from the keyboard.
// you need to hit enter to generate this event.
stdin.on('data', readKeyboardInput);

var udpServer = udp.createSocket('udp4');   // create UDP socket
udpServer.bind(8888);                       // bind the socket server to a port number

// server event handlers:
udpServer.on('listening', announceServer);  // runs when the server starts listening
udpServer.on('message', readIncoming);      // runs when a UDP packet arrives

function announceServer() {
  var serverAddress = udpServer.address();
  console.log('UDP Server listening on ' + serverAddress.address + ":" + serverAddress.port);
}

// when there's new data, check if the client sending it is in the list.
function readIncoming(data, sender) {
  checkForNewClient(sender);
  // print out the client's message:
  console.log(sender.address + ':' + sender.port + ': ' + data);

  // if message is x, remove from client list:
  // data is a buffer, so convert to a string then trim whitespace:
  var result = data.toString().trim();
  if (result === 'x') {     // if the client sends x
    removeClient(sender);   // remove the client from the list
  }
}

function checkForNewClient(newClient) {
  var isNewClient = true;
  // see if the client IP address matches one in the list:
  for (c in clients) {
    if (clients[c].address === newClient.address ) {
      isNewClient = false;
    }
  }
  // if this is a new client, add it to the client list:
  if (isNewClient) {
    // send the new client a greeting
    udpServer.send('hello', newClient.port, newClient.address);
    clients.push(newClient);
  }
}

function removeClient(client) {
  console.log('client disconnected');
  var position = clients.indexOf(client); // get the client's position in the array
  clients.splice(position, 1);            // delete it from the array
}

// read incoming keyboard data:
function readKeyboardInput(data) {
  data = data.trim();                     // trim any whitespace from the string
  switch (data) {                         // if the user types c
    case 'c':
    for (c in clients) {                  // list the client array
      console.log(clients[c]);
    }
    break;
    default:
    // broadcast the message to all clients
    for (c in clients) {                  // iterate over the client array
      // send the message to each client:
      udpServer.send(data, clients[c].port, clients[c].address);
    }
    break;
  }
}
