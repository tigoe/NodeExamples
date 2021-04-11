/*
  Datalogger client

  Connects to a server using HTTPS and uploads data.
  Uses realtime clock on the SAMD21 (MKR boards and Nano 33 IoT) to
  keep time.
  This client works with the server found at XXXXX

  Works with MKR1010, MKR1000, Nano 33 IoT
  Uses the following libraries:
   http://librarymanager/All#WiFi101  // use this for MKR1000
   http://librarymanager/All#WiFiNINA  // use this for MKR1010, Nano 33 IoT
   http://librarymanager/All#ArduinoHttpClient
   http://librarymanager/All#Arduino_JSON
   http://librarymanager/All#RTCZero

  created 18 Feb 2019
  modified 3 Apr 2021
  by Tom Igoe
*/
// include required libraries and config files
#include <SPI.h>
//#include <WiFi101.h>        // for MKR1000 modules
#include <WiFiNINA.h>         // for MKR1010 modules
#include <ArduinoHttpClient.h>
// for simplifying JSON formatting:
#include <Arduino_JSON.h>
// realtime clock module on the SAMD21 processor:
#include <RTCZero.h>
// I2C and light sensor libraries:
#include <Wire.h>
#include <Adafruit_TCS34725.h>
// include crypto chip library:
#include <ECCX08.h>
// network names and passwords:
#include "arduino_secrets.h"

// network socket to server. For HTTP instead of HTTPS,
// use WiFiClient instead of WiFiSSLClient:
WiFiSSLClient netSocket;
// server name:
const char server[] = SECRET_SERVER;
// Server port. For HTTP instead of HTTPS, use 80 instead of 443:
const int port = 443;
// API route:
String route = "/data";
// set the content type:
const char contentType[] = "application/json";

// the HTTP client is global so you can use it in multiple functions below:
HttpClient client(netSocket, server, port);
// initialize RTC:
RTCZero rtc;
// a JSON variable for the body of your requests:
JSONVar body;

// request timestamp in minutes:
long lastRequestTime = 0;
// last second:
int lastSecond = 0;
// interval between requests, in minutes:
int sendInterval = 1;
// initialize the light sensor:
Adafruit_TCS34725 tcs = Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_700MS, TCS34725_GAIN_1X);

// a unique ID string for this client. 
// since you're using the ECCX08 chip, the ID will be
//a 9-byte number in hexadecimal format:
String uid;

void setup() {
  Serial.begin(9600);              // initialize serial communication
  pinMode(LED_BUILTIN, OUTPUT);
  // if serial monitor is not open, wait 3 seconds:
  if (!Serial) delay(3000);
  // start the realtime clock:
  rtc.begin();
  // start the crypto chip and use its serial number
  // as a unique ID:
  ECCX08.begin();
  uid = ECCX08.serialNumber();

  // add it to the body JSON for the requests to the server:
  body["uid"] = uid;
  // attempt to connect to network:
  connectToNetwork();
}

void loop() {
  // if you disconnected from the network, reconnect:
  if (WiFi.status() != WL_CONNECTED) {
    digitalWrite(LED_BUILTIN, LOW);
    connectToNetwork();
  }

  // If the client is not connected:
  if (!client.connected()) {
    // and the request interval has passed:
    if (abs(rtc.getMinutes() - lastRequestTime) >= sendInterval) {
      // read the sensor
      readSensor();
      // print latest reading, for reference:
      Serial.println(JSON.stringify(body));
      // make a post request:
      client.post(route, contentType, JSON.stringify(body));
    }
  }

  // If there is a response available, read it:
  if (client.available()) {
    // read the status code and body of the response
    int statusCode = client.responseStatusCode();
    String response = client.responseBody();

    // print out the response:
    Serial.print("Status code: ");
    Serial.println(statusCode);
    Serial.print("Response: " );
    Serial.println(response);
    // close the request:
    client.stop();
    // timestamp the request if you got a good response:
    if (statusCode == 200) {
      lastRequestTime = rtc.getMinutes();
    }
  }
}

void readSensor() {
  // get lux and color temperature from sensor:
  uint16_t r, g, b, c, colorTemp, lux;
  tcs.getRawData(&r, &g, &b, &c);
  colorTemp = tcs.calculateColorTemperature_dn40(r, g, b, c);
  lux = tcs.calculateLux(r, g, b);

  // update elements of request body JSON object:
  body["dateTime"] = getISOTimeString();
  body["lux"] = lux;
  body["ct"] = colorTemp;
}

String getISOTimeString() {
  // ISO8601 string: yyyy-mm-ddThh:mm:ssZ
  String timestamp = "20";
  if (rtc.getYear() <= 9) timestamp += "0";
  timestamp += rtc.getYear();
  timestamp += "-";
  if (rtc.getMonth() <= 9) timestamp += "0";
  timestamp += rtc.getMonth();
  timestamp += "-";
  if (rtc.getDay() <= 9) timestamp += "0";
  timestamp += rtc.getDay();
  timestamp += "T";
  if (rtc.getHours() <= 9) timestamp += "0";
  timestamp += rtc.getHours();
  timestamp += ":";
  if (rtc.getMinutes() <= 9) timestamp += "0";
  timestamp += rtc.getMinutes();
  timestamp += ":";
  if (rtc.getSeconds() <= 9) timestamp += "0";
  timestamp += rtc.getSeconds();
  timestamp += "Z";
  return timestamp;
}

void connectToNetwork() {
  // try to connect to the network:
  while ( WiFi.status() != WL_CONNECTED) {
    Serial.println("Attempting to connect to: " + String(SECRET_SSID));
    //Connect to WPA / WPA2 network:
    WiFi.begin(SECRET_SSID, SECRET_PASS);
    delay(2000);
  }
  Serial.println("connected to: " + String(SECRET_SSID));
  // You're connected, turn on the LED:
  digitalWrite(LED_BUILTIN, HIGH);

  // set the time from the network:
  unsigned long epoch;
  do {
    Serial.println("Attempting to get network time");
    epoch = WiFi.getTime();
    delay(2000);
  } while (epoch == 0);

  rtc.setEpoch(epoch);
  Serial.println(getISOTimeString());
  IPAddress ip = WiFi.localIP();
  Serial.print(ip);
  Serial.print("  Signal Strength: ");
  Serial.println(WiFi.RSSI());
}
