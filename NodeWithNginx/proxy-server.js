/*
  Express.js GET/POST example as a proxy server for nginx
  Shows how to get the parameters of a GET vs a POST request
  in Express.js 4.0

  This assumes nginx has setup a proxy to node.js on port 8080.
  For more on this, see  
  https://itp.nyu.edu/networks/setting-up-restful-web-services-with-nginx/

  created 16 Feb 2024
  by Tom Igoe
*/

var express = require('express');			    // include express.js
var server = express();						        // a local instance of it
var bodyParser = require('body-parser');	// include body-parser
var proxyLocation = '/garden';            // the proxy location from nginx

// you need a couple of parsers for the body of a POST request:
server.use(bodyParser.json()); 						  // for  application/json
server.use(bodyParser.urlencoded({ extended: false })); // for application/x-www-form-urlencoded

// this runs after the server successfully starts:
function serverStart() {
  var port = this.address().port;
  console.log('Server listening on port ' + port);
}

// this is called by both GET and POST handlers,
// to format a response to the request:
function formatResponse(thisContent) {
  var result = "";
  // see if there's any data in the request:
  if (Object.keys(thisContent).length == 0) {
    result = "you sent me nothing";
  } else {
    result = 'You sent me:';
    for (item in thisContent) {
      result += `${item}: ${thisContent[item]}`;
      result += " ";
    }
  }
  return result;
}

function handleGet(request, response) {
  console.log('got a GET request');
  // the parameters of a GET request are passed in
  // request.query. Pass that to formatResponse()
  // for formatting:
  var content = formatResponse(request.query);
  console.log(content);

  // send the response:
  response.send(content);
  response.end();
}

function handlePost(request, response) {
  console.log('Got a POST request');
  // the parameters of a GET request are passed in
  // request.body. Pass that to formatResponse()
  // for formatting:
  var content = formatResponse(request.body);
  console.log(content);

  // send the response:
  response.send(content);
  response.end();
}

// this is the callback function for when the client
// requests the date (a dynamic route):
function handleDate(request, response) {
  console.log('got a GET request');
  // send the response:
  var now = new Date();
  response.send("Date: " + now + "\n");
  response.end();
}

// start the server:
server.listen(8080, serverStart);
server.get(proxyLocation, handleGet);    // GET request listener
server.get(proxyLocation + '/data', handleGet);    // GET request listener
server.get(proxyLocation + '/date', handleDate);   // GET request listener
server.post(proxyLocation + '/data', handlePost);  // POST request listener
