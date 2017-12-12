/*
socketServer.js

A simple chat server in node.js.
Prints all client text to the console. Keeps track of clients
in an array. Typing 'c' will print the array of clients.
If a remote client sends 'x' it will be removed from the list.

created 25 Jan 2015
modified 7 Sept 2017
by Tom Igoe
*/

var net = require('net'); // make an instance of the net library
var clients = new Array;  // array to track clients when they connect

var stdin = process.openStdin();    // enable input from the keyboard
stdin.setEncoding('utf8');          // encode everything typed as a string

// this function runs if there's input from the keyboard.
// you need to hit enter to generate this event.
stdin.on('data', readKeyboardInput);

var server = net.createServer(listenForClients);  // create the server
server.listen(8080);                              // start the server listening

// This function is called every time a new client connects:
function listenForClients(client) {
  console.log('client connected at ' + new Date());
  console.log('client: ' + client.remoteAddress);
  client.setEncoding('utf8');   // encode everything sent by the client as a string
  client.write('hello');        // send the client a hello message
  clients.push(client);         // append the client to the array of clients

  function removeClient() {
    console.log('client disconnected');
    var position = clients.indexOf(client); // get the client's position in the array
    clients.splice(position, 1);            // delete it from the array
  }

  function clientError(error) {
    console.error('Network connection error', error);
    client.end();
  }

  function readIncoming(data) {
    data = data.trim();            // trim any whitespace from the string
    if (data === 'x') {            // if the client sends 'exit',
      console.log('closing client');
      client.end();                  // disconnect the client
    }
    console.log(client.remoteAddress + ': ' + data); // print what the client said
  }

  // client event handlers:
  client.on('end', removeClient);   // runs if the remote side disconnects
  client.on('error', clientError);  // runs if there's a socket error
  client.on('data', readIncoming);  // runs if there's incoming socket data

  // set a function to check the client list periodically:
  setInterval(checkClientList, 5000);
}

function checkClientList(clientToDelete) {
  for (c in clients) {
    if ((typeof(clients[c]) === 'undefined') ||
    (clients[c] === clientToDelete)) {
      console.log('deleting client ' + clients[c].remoteAddress);
      var position = clients.indexOf(c); // get the client's position in the array
      clients.splice(position, 1);            // delete it from the array
    }
  }
}

// read incoming keyboard data:
function readKeyboardInput(data) {

  data = data.trim();                 // trim any whitespace from the string
  switch ('i got ' + data) {
    case 'c':
    for (c in clients) {
      console.log(clients[c].remoteAddress);
    }             // list the client array
    break;
    default:
    // otherwise, broadcast the message to all clients
    for (thisClient in clients) {     // iterate over the client array
      clients[thisClient].write(data);// send the message to each client
    }
    break;
  }
}
