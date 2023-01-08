/*
   MQTT Node.js  client. 
  Connects to shiftr.io's public broker, reads a given topic. Serves an HTML page with JavaScript that also acts as an MQTT client.
  
  created 13 Jun 2021
  modified 8 Jan 2023
  by Tom Igoe
*/


// include the MQTT library, fetch library, and express library:
const mqtt = require("mqtt");
const express = require("express");

const server = express(); // create a server using express
server.use("/", express.static("public")); // serve static files from /public
server.listen(process.env.PORT || 8080); // start the server

// All these brokers work with this code. 
// Uncomment the one you want to use. 

////// emqx. Works in both basic WS and TLS WS:
// const broker = 'wss://broker.emqx.io:8084/mqtt'
// const broker = 'ws://broker.emqx.io:8083/mqtt'

//////// shiftr.io desktop client. 
// Fill in your desktop IP address for localhost:
// const broker = 'ws://localhost:1884';     

//////// shiftr.io, requires username and password 
// (see options variable below):
const broker = 'wss://public.cloud.shiftr.io';

//////// test.mosquitto.org, uses no username and password:
// const broker = 'wss://test.mosquitto.org:8081';

// connection options:
let options = {
  // Clean session
  clean: true,
  // connect timeout in ms:
  connectTimeout: 10000,
  // Authentication
  clientId: 'nodeClient',
  // add these in for public.cloud.shiftr.io:
  username: 'public',
  password: 'public'
}

// topic and message payload:
let topic = "conndev/#";


// connect handler:
function setupClient() {
  console.log("connected to broker");
  // read all the subtopics:
  client.subscribe(topic);
  // set a handler for when new messages arrive:
  client.on("message", readMqttMessage);
}

// new message handler:
function readMqttMessage(topic, message) {
  // message is a Buffer, so convert to a string:
  let msgString = message.toString();
  let msg;
  try {
    msg = JSON.parse(message);
    console.log(msg);
  } catch (error) {
    console.log(error);
  }
}

// make a client and connect:
const client = mqtt.connect(broker, options);
client.on("connect", setupClient);
