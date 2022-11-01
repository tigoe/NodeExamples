
var express = require('express');			// include express.js
var server = express();						    // a local instance of it

function serverStart() {
  console.log("Server started");
}

function getName(request, response) {
  let username = request.query.name;
  let age = request.query.age;
  let str = "hello " + username;
  if (request.query.age > 21) {
    str += " You're old enough to drink in the US";
  } else {
    str += "no mai tais for you this halloween!";
  }
  response.send(str);
}

server.listen(8080, serverStart);
server.get("/name", getName);
