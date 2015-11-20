/*
	HTTP/HTTPS request example to Enertiv
  Does basic Oauth2 exchange to get access token
  then makes first API request with the token.
  This is a quick-and-dirty solution, and should be improved upon.

  to call it from the command line:
  node client.js username password

  TODO:
    * Simplify with async.js or q.js or an oauth2 library

	created 25 Feb 2015
	by Tom Igoe
*/

var https = require('https');
var querystring = require('querystring');

var username = process.argv[2],   // get the username from the command line
  password = process.argv[3];     // get the password from the command line

var clientData;

/*
 set up the options for the login.
 fill in your client_id and client_secret here:
*/
var loginData = querystring.stringify({
    'client_id': 'eeeee',
    'client_secret': 'eeeee',
    'grant_type': 'password',
    'username': username,
    'password': password
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
