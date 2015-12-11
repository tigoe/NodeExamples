/*
  HTTP/HTTPS request example to Enertiv
  Does basic Oauth2 exchange to get access token
  then makes first API request with the token.
  This is a quick-and-dirty solution, and should be improved upon.
  You'll need to add a file, cred.js, to the same directory as this file,
  with the following in it:

  var creds = {
      username : your_username,
      password : your_password,
      clientID : your_client_id,
      clientSecret : your_client_secret
  }
  module.exports = creds;

  to call it from the command line:
  node client.js

  created 25 Feb 2015 by Tom Igoe
  updated 08 Dec 2015 by John Farrell
*/
var https = require('https');
var querystring = require('querystring');
var cred = require('./cred.js');
var clientData;
// Bring in login information from our cred file
var loginData = querystring.stringify({
    'client_id': cred.clientID,
    'client_secret': cred.clientSecret,
    'grant_type': 'password',
    'username': cred.username,
    'password': cred.password
  });

// set up the HTTPS request options. You'll modify and
// reuse this for subsequent calls:
var options = {
  rejectUnauthorized: false,
  method: 'POST',
  host: 'api.enertiv.com',
  port: 443,
  path: '/oauth2/access_token/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': loginData.length
  }
};


var enertiv = function(){

  var path;
  var self = this;

  // Authenticate with Enertiv API
  this.login = function(apiPath, cb){
    callback = cb;
    path = apiPath;   // set path argument to use later
    var request = https.request(options, self.saveToken);  // start it
      request.write(loginData);                        // add  body of  POST request
      request.end();   
  };

  // Parse response and save auth token
  // Pass that token to further API calls
  this.saveToken = function(response){
    var result = '';    // string to hold the response
    var accessToken;
    // as each chunk comes in, add it to the result string:
    response.on('data', function (data) {
      result += data;
    });

    // when the final chunk comes in, print it out:
    response.on('end', function () {
      result = JSON.parse(result);
      accessToken = result.access_token;
      self.apiCall(accessToken);  
    });
  };

  // Generic function for API calls using auth token
  this.apiCall = function(token){
    // Change to a GET request
    options.method = 'GET';
    // Set our path to the original argument
    options.path = path;
    // Change authorization header to include our token
    options.headers = {
      'Authorization': 'Bearer ' + token
    }
    request = https.get(options, function (response) { // make the API call
      var result = '';
      // as each chunk comes in, add it to the result string:
      response.on('data', function (data) {
        result += data;
      });

      // when the final chunk comes in, print it out:
      response.on('end', function () {
        result = JSON.parse(result);
        clientData = result[0];
        //console.log(clientData.uuid);
        callback(clientData);
      });
    });
  };
}

module.exports = enertiv;
