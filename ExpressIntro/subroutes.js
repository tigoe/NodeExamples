/*
	Express.js use of Router() function example
	Shows how to set up sub-routers
	in Express.js 4.0

	created 29 Oct 2015
	by Tom Igoe
*/

const express = require('express');         // include the express library
var server = express();                   // create a server using express

server.use('/',express.static('public')); // serve static files from /public

// set up routers for kitchen, livingroom, lights
var kitchen = express.Router();
var livingroom = express.Router();
var bedroom = express.Router();

server.use('/kitchen', kitchen);
server.use('/livingroom', livingroom);
server.use('/bedroom', bedroom);

// respond to /lights:
function lights(request, response) {
  console.log(request.baseUrl);
  console.log(request.path);
  response.end('change lights');
}

// respond to /hvac:
function hvac(request, response) {
  console.log(request.baseUrl);
  console.log(request.path);
  response.end('change HVAC');
}

// respond to /kitchen:
function getKitchen(request, response, next) {
  response.write('in the kitchen ');    // start a response
  next();                               // pass to the next router
}

// respond to /bedroom:
function getbedroom(request, response, next) {
  response.write('in the bedroom ');    // start a response
  next();                               // pass to the next router
}

// respond to /livingroom:
function getLivingroom(request, response, next) {
  response.write('in the living room ');// start a response
  next();                               // pass to the next router
}

// start the server:
server.listen(process.env.PORT || 8080);


// set route listeners. Multiple callbacks means the event is passed
// to each callback in the list, in sequence, if the previous callback
// used the next() call:
kitchen.get('/lights', [getKitchen, lights]);
kitchen.get('/hvac', [getKitchen, hvac]);

bedroom.get('/lights', [getbedroom, lights]);
bedroom.get('/hvac', [getbedroom, hvac]);

livingroom.get('/lights', [getLivingroom, lights]);
livingroom.get('/hvac', [getLivingroom, hvac]);

server.get('/lights', lights);
server.get('/hvac', hvac);
