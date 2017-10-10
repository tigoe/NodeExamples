/*
  Four line static file server
  This server script serves files from a subfolder called 'public'

  adapted from expressjs.com examples, 2016
  by Tom Igoe
*/
var express = require('express');	        // include the express library
var server = express();					          // create a server using express
server.use('/',express.static('public')); // serve static files from /public
server.listen(8080);                      // start the server
