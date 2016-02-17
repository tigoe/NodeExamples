/*
  HTTPS request example to Enertiv
  Uses the Request module
  You'll need to add a file, cred.js, to the same directory as this file,
  with the following in it:
  var creds = {
      username : your_username,
      password : your_password,
      clientID : your_client_id,
      clientSecret : your_client_secret
  }
  module.exports = creds;
  created 23 Jan 2016 by John Farrell
*/

var querystring = require('querystring');
var request = require('request');
var cred = require('./cred.js');

// Read login data from cred.js file (see above)
var loginData = {
  'host': 'https://api.enertiv.com',
  'client_id': cred.clientID,
  'client_secret': cred.clientSecret,
  'grant_type': 'password',
  'username': cred.username,
  'password': cred.password
};


// module to export
var enertiv = function() {
  var self = this;
    var callback;
    var accessToken;

    // Function to login to API
    // Uses loginData object 
    this.login = function(cb){
      callback = cb;
      request.post({
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
          },
        uri: loginData.host + '/oauth2/access_token/',
        body: querystring.stringify(loginData)
      },
      self.saveToken
      );
  };

  // Saves token from Login response
  // Called at the end of this.login()
    this.saveToken = function (error, response, body) {
    if (error) {console.log(error)}
      else if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        accessToken = info.access_token;
        callback();
      }
   };

  // Generic API call function
  // Makes use of previously saved token
    this.apiCall = function(path, cb){
      callback = cb;
    request({
      headers:{
        'Authorization': 'Bearer ' + accessToken
        },
      uri: loginData.host + path
      },
    function (error, response, body){
      console.log(error);
      console.log(body);
      callback(body);
      }
    );
  };
};



module.exports = enertiv;
