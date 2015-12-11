var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var client = require('./client.js');

var app = express();
var c = new client;



app.use(express.static(path.join(__dirname, '/views')));
app.use(express.static(path.join(__dirname, '/public')));
//app.use('/', routes);


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('app listening at http://%s:%s', host, port);
});



 app.get('/', function (req,res){
  var data = c.login('/api/client/', function (data) {
    console.log(data); 
    res.end(JSON.stringify(data));
  
  });
  
});

