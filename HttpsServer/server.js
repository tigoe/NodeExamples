/*
HTTP/HTTPS server
context: node.js

/ to create keys for self-signing: https://www.digitalocean.com/community/tutorials/openssl-essentials-working-with-ssl-certificates-private-keys-and-csrs

openssl req -newkey rsa:2048 -nodes -keyout domain.key -x509 -days 365 -out domain.crt

to properly sign:
https://certbot.eff.org

Note: on DigitalOcean,  key and cert are at:
/etc/letsencrypt/live/domainName/privkey.pem // the key
/etc/letsencrypt/live/domainName/cert.pem   // the cert

Updated 2 Nov 2020
by Tom Igoe

*/
// include libraries and declare global variables:
var express = require('express');       // include the express library
var https = require('https');     // require the HTTPS library
var http = require('http');       // require the HTTP library
var fs = require('fs');           // require the filesystem library
var server = express();                                   // create a server using express
var bodyParser = require('body-parser');	// include body-parser

var options = {                              // options for the HTTPS server
  key: fs.readFileSync('./keys/domain.key'), // the key
  cert: fs.readFileSync('./keys/domain.crt') // the certificate
};

server.use('*', httpRedirect);              // set a redirect function for http
server.use('/',express.static('public'));   // set a static file directory

// you need a couple of parsers for the body of a POST request:
server.use(bodyParser.json()); 						  // for  application/json
server.use(bodyParser.urlencoded({extended: false})); // for application/x-www-form-urlencoded


function httpRedirect(request,response, next) {
  if (!request.secure) {
    console.log("redirecting http request to https");
    response.redirect('https://' + request.hostname + request.url);
  } else {
    next();     // pass the request on to the express.static middleware
  }
}

function handlePost(request, response)  {
   console.log('post from: ' + request.connection.remoteAddress);
   console.log(request.body);
   response.end('thanks for that');
}
// start the server:
http.createServer(server).listen(8080);           // listen for HTTP
https.createServer(options, server).listen(443);  // listen for HTTPS

server.post('/data', handlePost);
