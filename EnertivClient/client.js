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
  updated 28 Nov 2015 by John Farrell

*/

var querystring = require('querystring');
var request = require('request');
var rp = require('request-promise');
var cred = require('./cred.js');

// Grab login data from our cred.js file 
var loginData = {
  'host': 'https://api.enertiv.com',
  'client_id': cred.clientID,
  'client_secret': cred.clientSecret,
  'grant_type': 'password',
  'username': cred.username,
  'password': cred.password
};

// Make a callback function to handle the server response
// At the end of the function, we call GetClientInfo
// We are passing a new path for the URI and our new access token
function callback(error, response, body) {
  if (error) {console.log(error)}
    else if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      var token = info.access_token;
      getClientInfo('/api/client/', token);
    }
}

// Make a POST request, establishing headers, URI and body
// Run our callback function as the second argument to the request
var req = request.post({
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
      },
    uri: loginData.host + '/oauth2/access_token/',
    body: querystring.stringify(loginData)
  },
  callback
);

// Function to check your account client information
function getClientInfo(path, token){
  request({
    headers:{
      'Authorization': 'Bearer ' + token
      },
    uri: loginData.host + path
    },
  function (error, response, body){
    console.log(error);
    console.log(body);
  });
}

