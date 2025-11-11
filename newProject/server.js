var express = require('express');	// include the express library
var server = express();			// create a server using express
server.use('/',express.static('public')); // serve static files from /public
console.log("hello I am running");

server.listen(process.env.PORT || 8080);  // start the server

