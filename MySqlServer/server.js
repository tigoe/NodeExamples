/*
created 7 Jan 2019
  	by Tom Igoe
*/

// library includes:
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const read = require('read');
let dbConfig = {
    host: 'localhost',
    user:'',
    password: '',
    database: 'ConnectedDevicesSP2019'
}
let server = express();     // web server
let db;                     // database

// a Promise to get DB user name and password
// before starting the database and server:
let userInput = new Promise(function (resolve, reject) {
    let user = {};
    // if you get a username, read the password:
    function getUser(error, username) {
        if (error) throw error;
        user.name = username;
        read({ prompt: "Password: ", silent: true }, getPassword);
    }
    // if you get the password, open the DB and launch the server:
    function getPassword(error, passwd) {
        if (error) throw error;
        user.pass = passwd;
        if (user.name && user.pass) {
            resolve(user);
            // if you don't have a good username and password, 
            // reject the promise:
        } else {
            reject(new Error('You need to enter a DB username and password to proceed.'));
        }
    }
    // read the username:
    read({ prompt: "Username: " }, getUser);
});

// this runs after the server successfully starts:
function serverStart() {
    var port = this.address().port;
    console.log('Server listening on port ' + port);
}

function getData(request, response) {
    console.log('got a POST request');
    console.log(request.query);
    dbQuery();
    response.send(request.query);
    response.end();
}

function addData(request, response) {
    console.log('Got a POST request');
    console.log(request.body);
    // let query = "INSERT INTO readings (sessionKey, MacAddr) VALUES ('" 
    // + sessionKey + "', '" + macAddress + "');";
    // db.connect();
    // db.query(query, readResult);
    // // db.query('SELECT * from readings', readResult);
    // db.end();
    
    response.send(request.body);
    response.end();
}

function deleteData(request, response) {
    console.log('Got a DELETE request');
    console.log(request.body);
    response.send(request.body);
    response.end();
}

function readDBResult(error, results, fields) {
    if (error) throw error;
    console.log(results[0]);
}

//-------------- The program starts running here:
userInput       // get DB username and password, then:
    .then(function (user) {
        // set up the database with DB username and password
        dbConfig.user = user.name;
        dbConfig.password = user.pass;
        db = mysql.createConnection(dbConfig);
        // serve static files from /public:
        server.use('/', express.static('public'));
        // you need a couple of parsers for the body of a POST request:
        // for  application/json:
        server.use(bodyParser.json());
        // for application/x-www-form-urlencoded:	  
        server.use(bodyParser.urlencoded({ extended: false }));
        // start the server and set up routes:
        server.listen(process.env.PORT || 8080, serverStart);
        server.post('/add', addData);
        server.post('/data', getData);
        server.delete('/delete', deleteData);
    })
    // if there's a problem with the username or password, 
    // catch it and stop:
    .catch((error) => {
        console.log(error)
    });
