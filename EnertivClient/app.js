var express = require('express');
var client = require('./client.js');

var app = express();
var c = new client;

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('app listening at http://%s:%s', host, port);
});


// Basic client information
app.get('/client', function (req,res){
	var data = c.login('/api/client/', function (data) {
    	res.send(data);
  	});
});

// Something is off here...
app.get('/top10', function (req,res){
	var data = c.login('/api/client/', function (data) {
    	var clientid = data.uuid;
    	var start = encodeURIComponent('2015-01-01 00:00:00Z');
    	var end = encodeURIComponent('2015-09-01 00:00:00Z');
    	
    	var info = c.login('/api/client/'+clientid+'/top_consumers/?count=10&fromTime='+start+'&toTime='+end, function(info){
    		console.log('/api/client/'+clientid+'/top_consumers/?count=10&fromTime='+start+'&toTime='+end);
    		res.end(JSON.stringify(info));
    	})
  	});
});
