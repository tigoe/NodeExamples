// server.js

const express = require("express");
const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());


var readings = {
  temperature: 18,
  humidity: 45
};


app.get("/queryTest", (request, response) => {
  // send the JSON object as a string response
  console.log(request.query);
  response.end("Hi there");

});

app.post("/bodyTest", (request, response) => {
  // send the JSON object as a string response
  console.log(request.body);
  response.end("Hi there");
});


// sget the readings and return to the client:
app.get("/data", (request, response) => {
  // send the JSON object as a string response
  response.json(readings);
});

// send the client's stats back to them:
app.get("/hello", (request, response) => {
  console.log(request.connection.remoteAddress);
  console.log(request.headers);
  // send the JSON object as a string response
  response.end("hello");
});


// listen for requests :)
const listener = app.listen(process.env.PORT || 8080);