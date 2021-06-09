/*
  simple server example in node.js
  adapted from expressjs.com examples, 2016
  
  updated 9 Jun 2021
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
  response.json(data);
}

// a handler for POST /data
function handlePost(request, response) {
  console.log("got a POST request");
  // get the body of the request and add it
  // to the data you already have:
  let incomingData = request.body;
  console.log(incomingData);
  data.push(incomingData);
  response.json(data);
}

///////////////////////////////////////   start:
// start the server listening:
server.listen(process.env.PORT || 8080); 
// define the API endpoints:
server.get("/readings", handleGet);
server.post("/data", handlePost);