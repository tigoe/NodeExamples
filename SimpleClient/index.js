/*
	Simple HTTP/HTTPS request example

	created 9 Jan 2015
	by Tom Igoe
	based on node.js and stackoverflow examples
*/

// you can do this with http or https:
var https = require('https');

/*
 set up the options for the request.
 the full URL in this case is:
 https://dweet.io:443/get/latest/dweet/for/equable-men
*/
var options = {
  host: 'dweet.io',
  port: 443,
  path: '/get/latest/dweet/for/subsequent-cook'
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
var request = https.request(options, callback);	// start it
request.end();												// end it
