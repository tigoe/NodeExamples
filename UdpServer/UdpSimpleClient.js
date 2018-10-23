/*
A simple UDP client in node.js.
sends text strings using UDP
to run this:
$ node.js UdpSimpleClient.js destinationAddress destinationPprt 'message in single quotes'

created 22 Oct 2018
by Tom Igoe
*/
// include UDP datagram library:
const udp = require('dgram');       
// create UDP socket:
var sender = udp.createSocket('udp4');   
// bind the sender to a port number:
sender.bind(8887);  
// address is argv[2]. Port is argv[3]. Message is [4]
destAddress = process.argv[2];
destPort = process.argv[3];
message = process.argv[4];
sender.send(message + '\n', destPort, destAddress, completion);

function completion() {
    console.log('message sent');
    process.exit(0);            // quit
}
