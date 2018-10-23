/*
A UDP server in node.js.
Tracks remote clients in a list called clients. If a client sends an x, it's removed from the list.

created 27 Jun 2015
modified 22 Oct 2018
by Tom Igoe
*/

// include UDP datagram library:
const udp = require('dgram');
// create UDP socket:
var udpServer = udp.createSocket('udp4');
// bind the sender to a port number:
udpServer.bind(8888);
// a list to keep track of clients:
var clients = new Array;
// input string from the keyboard (STDIN):
var input = '';
// enable input from the keyboard:        
var stdin = process.openStdin();
// encode everything typed as a string: 
stdin.setEncoding('utf8');

// this function runs if there's input from the keyboard.
// you need to hit enter to generate this event.
stdin.on('data', readKeyboardInput);

// server event handlers:
// runs when the server starts listening:
udpServer.on('listening', announceServer);
// runs when a UDP packet arrives:
udpServer.on('message', readIncoming);

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
    if (clients[c].address === newClient.address) {
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
  // get the client's position in the array:
  var position = clients.indexOf(client);
  // delete it from the array:
  clients.splice(position, 1);
}

// read incoming keyboard data:
function readKeyboardInput(data) {
  // trim any whitespace from the string:
  data = data.trim();
  switch (data) {
    // if the user types c, list the client array:
    case 'c':
      for (c in clients) {
        console.log(clients[c]);
      }
      break;
    default:
      // broadcast the message to all clients
      for (c in clients) {    // iterate over the client array
        // send the message to each client:
        udpServer.send(data, clients[c].port, clients[c].address);
      }
      break;
  }
}