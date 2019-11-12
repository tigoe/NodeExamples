/*
   REST Test
   A minimal server to test a RESTful API.
   Modify to match your API. 

   The RESTful API in this case is for a networked thermostat. 
   The endpoints are:
   /temperature  - temperature in degrees C, a float
   /setpoint     - the temperature setpoint
   /status       - heat, cool, or fan
   /motion       - last time a motion sensor on the thermostat was triggered
   /datetime     - the current date and time

   You can GET the value of any of the endpoints, or 
   you can POST to them. 
*/

let express = require('express');	         // include the express library
let server = express();					         // create a server using express
let bodyParser = require('body-parser');	   // include body-parser
server.use('/', express.static('public'));   // serve static files from /public

// get the time:
let now = new Date();

// make a data object representing all your parameters:
let thermostat = {
   temperature: 20.5,   // temperature in degrees C, a float
   setpoint: 22,        // the temperature setpoint
   status: 'fan',       // heat, cool, or fan
   motion: now,         // last time a motion sensor on the thermostat was triggered
   datetime: now        // the current date and time
}

// you need a couple of parsers for the body of a POST request:
server.use(bodyParser.json()); 						  // for  application/json
server.use(bodyParser.urlencoded({ extended: true })); // for application/x-www-form-urlencoded


// this handles all GET requests. You may want to make
// separate functions for each API endpoint instead:
function handleGetRequest(request, response) {
   // print out the info from the request:
   printRequestInfo(request);
   let result = '';
   // find out the REST API path, and get the appropriate property:
   switch (request.path) {
      case '/temperature':
         result = thermostat.temperature;
         break;
      case '/setpoint':
         result = thermostat.setpoint;
         break;
      case '/status':
         result = thermostat.status;
         break;
      case '/motion':
         result = thermostat.motion;
         break;
      case '/datetime':
         result = thermostat.datetime;
         break;
   }
   response.end(result.toString());
}

// this handlles all POST requests. You may want to make
// separate functions for each API endpoint instead.
// NOTE: This does NOT check that your parameter values are valid. You should do that.

function handlePostRequest(request, response) {
   printRequestInfo(request);
   let result = '';
   // iterate over the properties in request.params:
   for (property in request.params) {
      // set the thermostat item with the same name as the
      // param that's set in request.params:
      thermostat[property] = request.params[property];
      // save the result so you can reply to the client:
      result = request.params[property];
   }
    response.end(result.toString());
}

// this pulls put elements of the request which you may want:
function printRequestInfo(request) {
   // the IP address of the client, the request method, and the path:
   console.log('Client IP address: ' + request.ip);
   console.log('Request method: ' + request.method);
   // the path is the API endpoint:
   console.log('Request path: ' + request.path);

   // if it's a POST request, you might want the params or
   // the body:
   if (request.method === 'POST') {
      console.log('Request parameters: ');
      console.log(request.params);
      console.log('Request body: ');
      console.log(request.body);
   }
   // If it's a GET, you can only query. It's not
   // very RESTful, but here's how you do it:
   if (request.method === 'GET') {
      console.log('Request Query: ');
      console.log(request.query);
   }
}

// here are all your endpoints. The pattern is:
// GET the  current value, or
// POST the new value as a request param:
server.get('/temperature', handleGetRequest);
server.post('/temperature/:temperature', handlePostRequest);
server.get('/setpoint', handleGetRequest);
server.post('/setpoint/:setpoint', handlePostRequest);
server.get('/status', handleGetRequest);
server.post('/status/:status', handlePostRequest);
server.get('/motion', handleGetRequest);
server.post('/motion/:motion', handlePostRequest);
server.get('/datetime', handleGetRequest);
server.post('/datetime/:datetime', handlePostRequest);

server.listen(8080);                      // start the server