/*
  Time server
  This server script shows how to use the JS Date object to 
  make timestamps and calculate uptime of a server. 
  
  The server serves an index.html page from the /public directory,
  and has a single API endpoint, /time, which returns:
  
  {
    reqTime: the time of the request according to the server's clock,
    timeSinceLast: the time since the last request from any client,
    startTime: the start time of the server,
    upTime: the time that the server has been running
  }
  
  For more on Date, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
  
  created 27 April 2022
  by Tom Igoe
*/

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

let lastRequest = new Date();
let serverStartTime = new Date();

app.use("/", express.static("public")); // serve static files from /public
app.use(bodyParser.json());

function getTime(request, response) {
  // get the current time:
  let requestTime = new Date();
  // get the time since last client request:
  let timeSinceLastRequest = new Date(requestTime - lastRequest);
  // get the uptime of the server:
  let uptime = new Date(requestTime - serverStartTime);
  
  // put them all in a JSON:
  let responseJson = {
    reqTime: requestTime,
    timeSinceLast: timeSinceLastRequest,
    startTime: serverStartTime,
    upTime: uptime
  }
  
  // send it to the client:
  response.json(responseJson);
  lastRequest = requestTime;
}

// listen for requests :)
const listener = app.listen(process.env.PORT || 8080);
app.get("/time", getTime);
