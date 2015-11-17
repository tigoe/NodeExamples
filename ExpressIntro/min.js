var express = require('express');	// using the express framework
var app = express();							// initalize express

app.get('/', function(request, response){
  console.log(request);

response.end("Hello, client");
});

app.get('/name', function(request, response){
 response.end("Hello, client. You asked for name");
})

app.post('/user', function(request, response){
  
})

app.listen(8080);
