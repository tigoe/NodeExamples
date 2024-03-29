/*
  Websocket server with express.js and express-ws.js
  (https://www.npmjs.com/package/express-ws)
  Serves an index page from /public. That page makes
  a websocket client back to this server.

  created 17 Jan 2021
  modified 8 Jan 2023
  by Tom Igoe
*/

// include express.js:
const express = require('express');			    
// a local instance of express:
let server = express();
// instance of the websocket server:
let wsServer = require('express-ws')(server); 
// list of client connections:
let clients = new Array;

// serve static files from /public:
server.use('/', express.static('public')); 

// this runs after the server successfully starts:
function serverStart() {
  var port = this.address().port;
  console.log('Server listening on port ' + port);
}

function handleWs(ws, request) {
  console.log("New Connection");        // you have a new client
  clients.push(ws);    // add this client to the clients array

  function endClient() {
    // when a client closes its connection
    // get the client's position in the array
    // and delete it from the array:
    var position = clients.indexOf(ws);
    clients.splice(position, 1);
    console.log("connection closed");
  }

  // if a client sends a message, print it out:
  function clientResponse(data) {
    console.log(request.ip + ': ' + data);
    broadcast(data, request.ip);
  }

  // set up client event listeners:
  ws.on('message', clientResponse);
  ws.on('close', endClient);
}

// This function broadcasts messages to all webSocket clients
function broadcast(data, clientAddress) {
  // iterate over the array of clients & send data to each
  for (let c in clients) {
    console.log(clientAddress);
    clients[c].send(clientAddress + ': ' + data);
  }
}

// start the server:
server.listen(process.env.PORT || 3000, serverStart);
// listen for websocket connections:
server.ws('/', handleWs);