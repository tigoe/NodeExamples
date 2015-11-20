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

  TODO:
    * Simplify with async.js or q.js or an oauth2 library

	created 25 Feb 2015
  updated 20 Nov 2015
	by Tom Igoe
*/

var https = require('https');
var querystring = require('querystring');
var cred = require('./cred.js');

var clientData;

/*
 set up the options for the login.
 fill in your client_id and client_secret here:
*/
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

/*
	the callback function to be run when the response comes in.
	this callback assumes a chunked response, with several 'data'
	events and one final 'end' response.
*/
function saveToken(response) {
  var result = '';		// string to hold the response
  var accessToken;
  // as each chunk comes in, add it to the result string:
  response.on('data', function (data) {
    result += data;
  });

  // when the final chunk comes in, print it out:
  response.on('end', function () {
    result = JSON.parse(result);
    accessToken = result.access_token;
    getClientInfo('/api/client/', accessToken);
  });
}


function getClientInfo(path, token) {
  options.path = path;
  options.method = 'GET';
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
      clientData = result;
      console.log(clientData);
    });
  });
}

// make the login request:
var request = https.request(options, saveToken);	// start it
  request.write(loginData);                       // add  body of  POST request
  request.end();												          // end it
