/*
	Express.js Static pages example
	Shows how to serve static pages along with dynamic routes
	in Express.js 4.0
	
	created 10 Feb 2015
	by Tom Igoe
*/

var express = require('express');			// include express.js
var app = express();								// a local instance of it

app.use(express.static('public'));

// this runs after the server successfully starts:
function serverStart() {
  var port = server.address().port;
  console.log('Server listening on port '+ port);
}

// this is the callback function for when the client
// requests a static file:
function serveFiles(request, response) {
  var options = {							// options for serving files
    root: __dirname + '/public/'		// root is the /public directory in the app directory
  };

  // if there's an error sending a file, this function
  // will be called:
  function fileError(error) {
    if (error) {								// if there's an error
      console.log(error);					// log it locally
      response.status(error.status)		// and send a HTTP 404 status message
      response.end();						// and close the connection
    }
    else {										// if no error
      console.log('Sent:', fileName);	//log that you sent the file
    }
  }
  // get the file name from the request parameter:
  var fileName = request.params.name;
  // send the file:
  response.sendFile(fileName, options, fileError);
}

// this is the callback function for when the client
// requests the date (a dynamic route):
function serveDate(request, response) {
	console.log('got a GET request');
	// send the response:
	response.write("Date: " + Date.now() + "\n");
	response.end();
}

// start the server:
var server = app.listen(8080, serverStart);
// start the listeners for GET requests:
app.get('/files/:name', serveFiles);	// GET handler for all static files
app.get('/date', serveDate);				// GET handler for /date


