/*
A UDP client in node.js.
sends text strings from the stdin to a remote server using UDP

created 17 Oct 2017
modified 22 Oct 2018
by Tom Igoe
*/
// include UDP datagram library:
const udp = require('dgram');  
// server address:
const serverAddress = '127.0.0.1'; 
// server's receiving port:        
const serverPort = 8888;              
// create UDP socket:
var sender = udp.createSocket('udp4');   
// bind the sender to a port number:
sender.bind(8887);  

// enable input from the keyboard:
var stdin = process.openStdin();  
// encode everything typed as a string:  
stdin.setEncoding('utf8');

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
  // trim any whitespace from the string:
  data = data.trim();   
  // send the message:
  sender.send(data, serverPort, serverAddress, messageSent);
}