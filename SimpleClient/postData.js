/*
	Simple HTTP/HTTPS request example
	Demonstrates a POST request with the body sent as JSON

	created 19 April 2015
	by Tom Igoe
	based on node.js and stackoverflow examples
*/

// you can do this with http or https:
var http = require('http');

// make the POST data a JSON object and stringify it:
var postData =JSON.stringify({
  'username':'Bob'
});

/*
 set up the options for the request.
 the full URL in this case is:
 http://example.com:443/login
*/

var options = {
  host: 'www.example.com',
  port: 443,
  path: '/logout',
	method: 'POST',
	headers: {
    'Content-Type': 'application/json',
    'Content-Length': postData.length
  }
};

/*
	the callback function to be run when the response comes in.
	this callback assumes a chunked response, with several 'data'
	events and one final 'end' response.
*/
function callback(response) {
  var result = '';		// string to hold the response

  // as each chunk comes in, add it to the result string:
  response.on('data', function (data) {
    result += data;
  });

  // when the final chunk comes in, print it out:
  response.on('end', function () {
    console.log(result);
  });
}

// make the actual request:
var request = http.request(options, callback);	// start it
request.write(postData);							// send the data
request.end();												// end it
