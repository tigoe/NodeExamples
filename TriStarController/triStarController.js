/*
May 1, 2017
by Dorothy Lam
based on:
+ Tom Igoe's HTTP code
+ npm MODBUS-SERIAL library
*/

// create an empty modbus client
var ModbusRTU = require("modbus-serial");
var client = new ModbusRTU();

var batteryVoltage;
var chargingCurrent;

// you can do this with http or https:
var http = require('https');

// open connection to a serial port
client.connectRTU("/dev/cu.usbserial-A5052KL2", {baudrate: 9600});
client.setID(1);

setInterval(read, 1000);

function read() {
    console.log('running read');
      // reads 1 register at 0x0008
    client.readHoldingRegisters(0x008, 1, function(err, data) {
        if(err){
            console.log(err);
        } else {
            // Round the number to two decimal points and keep the two digits even if they're 0
            batteryVoltage = (Math.round(((data.data * 96.667) / 32768)*100)/100).toFixed(2);
            console.log("battery voltage: ", batteryVoltage, "V");
            readCurrent();
        }
    });
}

function readCurrent(){
  client.readHoldingRegisters(0x00B, 1, function(err, data) {
          if(err){
              console.log(err);
          } else {
              // Round the number to two decimal points and keep the two digits even if they're 0
              chargingCurrent = Math.round((data.data*100)/100).toFixed(2);
              // var chargingCurrentRaw = (data.data * 96.667) / 32768
              console.log("charging current: ", chargingCurrent, "A");
              post();
          }
      })
}

/*
  the callback function to be run when the response comes in.
  this callback assumes a chunked response, with several 'data'
  events and one final 'end' response.
*/

function callback(response) {
  var result = '';    // string to hold the response

  // as each chunk comes in, add it to the result string:
  response.on('data', function (data) {
    result += data;
  });

  // when the final chunk comes in, print it out:
  response.on('end', function () {
    console.log(result);
  });
}

function post() {
  console.log('running post');
  // make the POST data a JSON object and stringify it:
  var postData = JSON.stringify({
   'batteryVoltage': batteryVoltage,
   'chargingCurrent': chargingCurrent
  });
  //posting options
  var options = {
  host: 'dweet.io',
  port: 443,
  path: '/dweet/for/jenna-battery-voltage',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': postData.length
    }
  };
  // make the actual request:
  var request = http.request(options, callback);  // start it
  request.write(postData);              // send the data
  request.end();                        // end it
  console.log('done posting');
}
