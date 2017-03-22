var express = require('express');	// using the express framework
var app = express();							// initalize express

// app.use('/',express.static('public'));


app.get('/', function(request, response){
  console.log(request);
  response.end("LIghting Class");
});

app.get('/data', function(request, response){
  console.log("Someone asked for the data");
  response.end("Hello, client. You asked for name");
})

app.listen(8080);
