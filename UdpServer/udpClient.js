/*
UDP server.js

A UDP client in node.js.
sends text strings from the stdin to a remote server using UDP

created 17 Oct 2017
by Tom Igoe
*/
const udp = require('dgram');         // include UDP datagram functions
const serverAddress = '127.0.0.1';    // server address
const serverPort = 8888;              // server's receiving port
const client = udp.createSocket('udp4');  // create a datagram socket

var stdin = process.openStdin();    // enable input from the keyboard
stdin.setEncoding('utf8');          // encode everything typed as a string

// this function runs if there's input from the keyboard.
// you need to hit enter to generate this event.
stdin.on('data', readKeyboardInput);

function messageSent(error) {   // when a message is sent,
  if (error) {                  // if there's an error,
    console.log(error);         // show it
  }
};

// read incoming keyboard data:
function readKeyboardInput(data) {
  data = data.trim();                     // trim any whitespace from the string
  // send the message:
  client.send(data, serverPort, serverAddress, messageSent);
}
