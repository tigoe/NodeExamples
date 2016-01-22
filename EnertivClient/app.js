var express = require('express');
var client = require('./client.js');
var app = express();
var c = new client;


// Examples using Enertiv node module
// See https://api.enertiv.com/docs/#!/api/ for available endpoints


var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('app listening at http://%s:%s', host, port);
});


var clientData = {};

//////////////////////////////////////////
//  Route to login - MUST DO FIRST
//////////////////////////////////////////
app.get('/login', function (req,res){
	var data = c.login(function (data){
		console.log("AUTHENTICATED");
		res.send("YOU ARE AUTHENTICATED");
		res.end();
	});
});


// Example showing client information
app.get('/client', function (req,res){
	var apiClient = c.apiCall('/api/client/', function (apiClient){
		var clientInfo = JSON.parse(apiClient);
		console.log(clientInfo[0]);
		res.send(clientInfo[0]);
		res.end(0);
	});
});



// Example showing top 10 energy consumers
// Note the redirect to /top10/:id below
app.get('/top10', function (req,res){
		var clientInfo = c.apiCall('/api/client/', function (clientInfo){
			var clientjson = JSON.parse(clientInfo);
			var clientid = clientjson[0].uuid;
			res.redirect('/top10/' + clientid);
	});
});


app.get('/top10/:ID', function (req,res){
	var client = req.params.ID;
	// Set the date range you want to examine
	var start = encodeURIComponent('2015-01-01 00:00:00Z');
	var end = encodeURIComponent('2015-09-01 00:00:00Z')
	
	var top10 = c.apiCall('/api/client/'+client+'/top_consumers/?count=10&fromTime='+start+'&toTime='+end, function (top10){
		console.log(JSON.parse(top10));
		res.send(JSON.parse(top10));
		res.end();
	});
});
		


// Get energy and cost data by location
app.get('/energy', function (req,res){
	var clientInfo = c.apiCall('/api/client/', function (clientInfo){
		var clientjson = JSON.parse(clientInfo);
		var locID = clientjson[0].locations[0];
		res.redirect('/energy/'+locID);
	});
});

app.get('/energy/:locationID', function (req,res){
	var location = req.params.locationID;
	var startdate = encodeURIComponent('2015-01-01 00:00:00Z');
	var enddate = encodeURIComponent('2015-09-01 00:00:00Z')
	var interval = 'month';
	var energyData = c.apiCall('/api/location/'+location+'/data/?fromTime='+startdate+'&toTime='+enddate+'&interval='+interval+'&cost=true', function (energyData){
	    console.log(JSON.parse(energyData));
	    res.send(JSON.parse(energyData));
		res.end();
	});
});













