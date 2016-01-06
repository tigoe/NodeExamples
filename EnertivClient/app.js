var express = require('express');
var client = require('./client.js');
var util = require('util');
var app = express();
var c = new client;


// Examples using Enertiv node module
// See https://api.enertiv.com/docs/#!/api/ for available endpoints


var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('app listening at http://%s:%s', host, port);
});

// Route to login - MUST DO FIRST
app.get('/login', function (req,res){
	var data = c.login(function (data){
		res.send("YOU ARE AUTHENTICATED");
	});
});

// Example showing client information
app.get('/client', function (req,res){
	var clientInfo = c.apiCall('/api/client/', function (clientInfo){
		res.send(clientInfo);
	});
});

// Example showing top 10 energy consumers - node redirect
app.get('/top10', function (req,res){
		var clientInfo = c.apiCall('/api/client/', function (clientInfo){
		var clientjson = JSON.parse(clientInfo);
		var clientid = clientjson[0].uuid;
		res.redirect('/top10/' + clientid);
	});
});


app.get('/top10/:id', function (req,res){
	clientid = req.params.id;
	var start = encodeURIComponent('2015-01-01 00:00:00Z');
	var end = encodeURIComponent('2015-09-01 00:00:00Z')
	
	var top10 = c.apiCall('/api/client/'+clientid+'/top_consumers/?count=10&fromTime='+start+'&toTime='+end, function (top10){
		console.log(JSON.stringify(top10));
		res.send(top10);
	
	})
});
		





