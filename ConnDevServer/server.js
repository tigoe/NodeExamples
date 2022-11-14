/*
  ConnDevServer

  A minimal server example that returns JSON formatted
  or text-formatted data.

  created 10 Nov 2022
  by Tom Igoe
*/

var express = require('express');			// include express.js
var server = express();						    // a local instance of it

var data = {
  "temp": Math.random() * 30,
  "humidity": Math.random() * 100
}

function serverStart() {
  console.log("Server started");
}

function getData(request, response) {
  response.json(data);
}

function notFound(request, response, next) {
  response.status(404).send("not found");
}

function changeData() {
  data.temp += (Math.random() - 0.5);
  data.humidity += (Math.random() - 0.5);
  // set a min of 0 and max of 100 on humidity:
  data.humidity = Math.min(data.humidity, 100);
  data.humidity = Math.max(data.humidity, 0);
}

server.listen(8080, serverStart);
server.get("/data", getData);
server.all('*', notFound);   // listen for GET /age
// change the data once a second:
setInterval(changeData, 1000);
