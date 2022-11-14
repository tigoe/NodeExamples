/*
  ConnDevServer

  A minimal server example that returns JSON formatted
  or text-formatted data. This version accepts a 
  POST request for /data and writes the body of the
  request to a file. 

  created 10 Nov 2022
  by Tom Igoe
*/

var express = require('express');			// include express.js
var server = express();						    // a local instance of it
var fs = require('fs')						// and the filesystem library	

var bodyParser = require('body-parser');	// include body-parser
// you need a couple of parsers for the body of a POST request:
server.use(bodyParser.json()); 						  // for  application/json
server.use(bodyParser.urlencoded({extended: false})); // for application/x-www-form-urlencoded

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

function saveData(request, response) {
  // get the body data:
 let dataString = JSON.stringify(request.body);

  // get the path to the data file: 
  let filePath = __dirname + '/data.txt';
 
  // this function is called by by the writeFile and appendFile functions 
  // below:
  function fileWriteResponse() {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write("You wrote the following to the data file: <br>");
    response.write(dataString);
    response.write("<br><a href=\"/\">Return to form</a>");
    response.end();
  }
  /* 
    write to the file asynchronously. THe third parameter of 
    writeFile is the callback function that's called when
    you've had a successful write. 
  */
  fs.exists(filePath, function (exists) {
    if (exists) {
      fs.appendFile(filePath, dataString, fileWriteResponse);
    } else {
      fs.writeFile(filePath, dataString, fileWriteResponse);
    }
  });
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
server.post("/data", saveData);
server.all('*', notFound);   // listen for GET /age
// change the data once a second:
setInterval(changeData, 1000);
