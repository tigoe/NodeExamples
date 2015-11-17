/*
  Minimal express.js app.
  This contains only the very basics of express.js.
  To run this, make sure express is installed using
  npm install express
  then run it and open a browser to localhost:8080
  // and one of the routes below (/name, /date, or /data):
*/

var express = require('express');	// using the express framework
var app = express();							// initalize express

// route callback functions:
function indexResponse(request, response) {
  // response.send expects one long string. It also
  // sends an HTTP header (200, OK), and closes the connection:
  var textToSend = "Hello! this server responds to the following routes: <br>";
  textToSend += "/name will tell you the server's name <br>";
  textToSend += "/date will tell you today's date <br>";
  textToSend += "/data/?parameter=value will tell you what you sent. <br>";
  response.send(textToSend);
}

function nameResponse(request, response) {
  // if you want to send a header, you do it like this:
  response.writeHead(200,{'Content-Type' :'text/html'});
  // response.end sends text and closes the connection to the client:
  response.end('My name is mimimalExpress.js');
}

function dateResponse(request, response) {
  // response.write sends text but doesn't close the connection:
  response.write("today's date is ");
  // all data sent must be in String form:
  response.end(new Date().toString());
}

function dataResponse(request, response) {
  // if the client sends parameters in the query string, like this:
  // http://localhost:8080/data/?parameter=value&param2=otherValue
  // then you can get that from the request object:
  var parameters = JSON.stringify(request.query);
  response.end('you sent me ' + parameters);
}

// start the server
app.listen(8080);								// listen for new requests

// set up route listeners:
app.get("/", indexResponse);    // respond to GET requests for /
app.get("/name", nameResponse); // respond to GET requests for /name
app.get("/date", dateResponse); // respond to GET requests for /date
app.get("/data", dataResponse); // respond to GET requests for /data
