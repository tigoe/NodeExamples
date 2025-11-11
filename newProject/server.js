var express = require('express');	// include the express library
var server = express();			// create a server using express
//server.use('/',express.static('public')); // serve static files from /public

function serverStart() {
  console.log("hello I am running");
}

function handleGarden(request, response) {
  console.log(request);
  response.send("Here's a garden!");
  response.end();
}

function handleFlowers(request, response) {
  var flowerJson = {
    "petals": 8,
    "stem": 3,
    "seeds": 1000000
  };
  console.log(request);
  response.json(flowerJson);
  response.end();
}

function handleWorms(request, response) {
  var wormJson = {
    "wormCount": 1000,
  }
  console.log(request);
  response.json(wormJson);
  response.end();
}

function handleBees(request, response) {
  var beeJson = {
    "beeCount": 100000000,
    "beeHave": "Oh!"
  }
  console.log(request);
  response.json(beeJson);
  response.end();
}

function handleFertilizer(request, response) {
  var fertilizerJson = {
    "poop": 1
  }
  console.log(request);
  response.json(fertilizerJson);
  response.end();
}

server.listen(8080, serverStart);  // start the server
server.get("/garden", handleGarden);
server.get("/garden/flowers", handleFlowers);
server.get("/garden/worms", handleWorms);
server.get("/garden/bees", handleBees);
server.post("/garden/fertilizer", handleFertilizer);