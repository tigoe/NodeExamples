/*
  webSocket client
  context: P5.js

  A webSocket client that draws a ball on the screen
  that's moved around with data from the server. The server
  is sending data received serially from an Arduino.
  The server is sending:

    x, y, buttonValue\n

    created 10 June 2015
    by Tom Igoe
*/

var socket = io();		      // socket.io instance. Connects back to the server
var x, y, button;           // readings from the server

function setup() {
  createCanvas(400, 300);   // set up the canvas
  x = width/2;              // set X and Y in the middle of the screen
  y = width/2;
}

function draw() {
  background(255);          // make the screen white
  var fillColor = 127;      // set the fill color to black
  noStroke();
  if (button == 1) {        // if the button is not pressed
    fillColor = color(0x44, 0x33, 0xAF);  // blue fill color
  }
  fill(fillColor);          // set the fill color
  ellipse(x, y, 30, 30);    // draw the ellipse
}

function readData (data) {
  var results = data.split(',');  // split the data on the commas
  x = results[0];                 // x is the first value
  y = results[1];                 // y is the second value
  button = results[2];            // button is the third value
}

// when new data comes in the websocket, read it:
socket.on('message', readData);
