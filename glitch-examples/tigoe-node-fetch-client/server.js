/* 
 tigoe-node-fetch-client
 
 This example shows how to use node.js to make requests to a RESTful API and simplify the result and serve it as a RESTful API. It assumes you're using a microcontroller-based client or have some other reason for needing the results of an API to be simplified. 
  
  created 9 Jan 2023
  by Tom Igoe
*/

// initialize express and the server, and a fetch instance too:
const express = require("express");
const server = express();
const fetch = require("node-fetch");

// value for the API request:
let requestUrl = "https://api.tidesandcurrents.noaa.gov/api/prod/datagetter";
// and the query string:
let query = {
  date: "latest",
  station: "8518750",
  product: "water_level",
  datum: "MTL",
  time_zone: "lst",
  units: "metric",
  format: "json",
};

// set the fetch parameters:
const params = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

// a listener for clients making a GET request:
function handleGet(request, response) {
  // iterate over the request query:
  for (let p in request.query) {
    // if there's a matching property in query,
    if (query.hasOwnProperty(p)) {
      // then replace it with this new value:
      query[p] = request.query[p];
    }
  }
  // convert the query to a string and attach to URL:
  let thisUrl = requestUrl;
  let queryString = new URLSearchParams(Object.entries(query)).toString();
  thisUrl += "?" + queryString;

  // make a request to the remote API using fetch:
  fetch(thisUrl, params)
    // convert fetchResponse to JSON
    .then((fetchResponse) => fetchResponse.json())
    // get the body of the fetchResponse and send to summarize:
    .then((data) => summarize(data))
    // if there's an error, send it to the client:
    .catch((error) => summarize(error));

  // function to do the summary of the result:
  function summarize(result) {
    // if the remote API returns an error:
    if (result.error) {
      response.end(result.error.message);
      return;
    }
    // if there is an error instead of a response:
    if (!result.data) {
      response.end(result);
      return;
    }
    // if there's a successful result from the remote API:
    let myData = result.data[0];
    let dataToReturn = {};
    // get just the time  and the water level:
    dataToReturn.time = myData.t;
    dataToReturn.waterLevel = myData.v;
    // send this in response to the original request:
    response.json(dataToReturn);
  }
}

// start the server listening on the glitch default,
// or port 8080:
server.listen(process.env.PORT || 8080);
// define the API endpoints:
server.get("/", handleGet);
