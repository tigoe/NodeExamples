/*
  simple server example in node.js
  adapted from expressjs.com examples, 2016
  
  updated 8 Jan 2023
  by Tom Igoe
*/

///////////////////////////////////////   Setup:
// include the express library and make an instance of it:
const express = require("express");
const server = express();
// serve static files from /public:
server.use("/", express.static("public"));

// use the body-parser middleware from express
// to listen for application/json from the POST request:
const bodyParser = require("body-parser");
server.use(bodyParser.json());
// for application/x-www-form-urlencoded from the POST request:
server.use(bodyParser.urlencoded({ extended: true }));

// some data:
var data = new Array();

///////////////////////////////////////   API route handlers:
// a listener for GET /readings
function handleGet(request, response) {
  console.log("got a GET request");
  console.log(request.query);
  response.json(data);
  console.log(process.env.PORT);
}

// a handler for POST /data
function handlePost(request, response) {
  console.log("got a POST request");
  // get the body of the request and add it
  // to the data you already have:
  let incomingData = request.body;
  console.log(incomingData);
  console.log(request.connection.remoteAddress);
  // console.log(request.rawHeaders);
  data.push(incomingData);
  response.json(data);
}

///////////////////////////////////////   start:
// start the server listening on the glitch default,
// or port 8080:
server.listen(process.env.PORT || 8080);
// define the API endpoints:
server.get("/readings", handleGet);
server.post("/data", handlePost);