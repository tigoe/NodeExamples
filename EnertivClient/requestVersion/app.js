var express = require('express');
var client = require('./client.js');
var app = express();
var c = new client;


// Examples using Enertiv node module with Express
// See https://api.enertiv.com/docs/#!/api/ for available endpoints

// Start our server
var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('app listening at http://%s:%s', host, port);
});


/*
	*
	*		Important Info
	*
	*		Must hit '/login' first to authenticate	
	*			- Follow setup in 'client.js'
	*		Most API endpoints use client info (client/location uuid)
	*		So, use '/client' to save that info for later use
	*
*/


// A couple boxes to push our API responses into
var clientData = {};
var topData = [];
var energyData = [];


// Hit this first to authenticate
app.get('/login', function (req,res){
	var data = c.login(function (data){
		console.log("YOU ARE AUTHENTICATED");
		res.send("AUTHENTICATED");
	});	
});


// Returns client information, saves the important bits for later
app.get('/client', function (req,res){
	var apiClient = c.apiCall('/api/client/', function (apiClient){
		var clientInfo = JSON.parse(apiClient);
		clientData.uuid = clientInfo[0].id;
	    clientData.locationID = clientInfo[0].locations[0];
		console.log(clientInfo[0]);
		res.send(clientData);
	});
	
});



// Example showing top 10 energy consumers
// Uses the client uuid we saved from '/client'
app.get('/top10', function (req,res){
	// Set the date range you want to examine
	var start = encodeURIComponent('2015-01-01 00:00:00Z');
	var end = encodeURIComponent('2015-09-01 00:00:00Z');
	var client = clientData.uuid;

	var top10 = c.apiCall('/api/client/'+client+'/top_consumers/?count=10&fromTime='+start+'&toTime='+end, function (top10){
		console.log(JSON.parse(top10));
		topData.push(JSON.parse(top10));
		res.send(topData);
	});
});


// Get energy and cost data by location
// Uses the location uuid we saved from '/client'
app.get('/energy', function (req,res){
	var location = clientData.locationID;
	var startdate = encodeURIComponent('2015-01-01 00:00:00Z');
	var enddate = encodeURIComponent('2015-09-01 00:00:00Z')
	var interval = 'month';

	var energy = c.apiCall('/api/location/'+location+'/data/?fromTime='+startdate+'&toTime='+enddate+'&interval='+interval+'&cost=true', function (energy){
	    console.log(JSON.parse(energy));
	    energyData.push(JSON.parse(energy));
	    res.send(energyData);
	});
});



