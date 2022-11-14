const https = require('https');
var hostName = ''; // add the host name here
var temperature = 0.0;
var humidity = 0.0;

// make the sensor data a JSON object:
var sensorData = JSON.stringify({
    'temperature': temperature,
    'humidity': humidity
});

// make the POST data a JSON object and stringify it:
var postData =JSON.stringify({
  'macAddress': '',    // add your mac address here
  'sessionKey': '',    // add your session key here
  'data': sensorData
});

/*
 set up the options for the request.
 the full URL in this case is:
 http://example.com:443/login
*/

var options = {
  host: hostName,
  port: 443,
  path: '/data',
	method: 'POST',
	headers: {
    'User-Agent': 'nodejs',
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
var request = https.request(options, callback);	// start it
request.write(postData);						// send the data
request.end();									    // end it
