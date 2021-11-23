/*
  Server and Client

  This example shows how to make an express.js server that
  is also an HTTP client. For example, if you have a server
  that pulls data from another site, your server is also a client. 

  Uses node-fetch API to make an HTTP client. Similarly,
  the index.html page uses fetch to make a call to this server.

  created 22 Nov 2021
  by Tom Igoe
*/

// include the express library and make an instance of it:
const express = require("express");
// include the node-fetch library and make an instance of it:
const fetch = require("node-fetch");
// make the server from the express instance:
const server = express();
// serve static files from /public:
server.use("/", express.static("public"));

// listener function for /time/:area/:location endpoint:
function getTimeByCity(request, response) {
  // print the request params out:
  console.log(request.params);
  // get the location and area from the client 
  // to query the worldTime API with:
  let location = request.params.location;
  let area = request.params.area;
  // form the request URL:
  let host = 'https://worldtimeapi.org';
  let path = '/api/timezone/' + area + '/' + location;
  
  // make the HTTP call using fetch:
  fetch(host + path)
    // await a JSON response:
    .then(res => res.json())
    // send that JSON response to the client:
    .then(json => {
      // print the results:
      console.log(json);
      // and send them on to the client:
      response.json(json);
    });
}

// start the server listening:
server.listen(process.env.PORT || 8080);
// define the API endpoint:
server.get("/time/:area/:location", getTimeByCity);