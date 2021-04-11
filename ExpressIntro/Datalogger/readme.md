# tigoe-datalogger

A server that serves a webpage, its resources, and some data.
There are two versions of the server here:
* `server.js` saves incoming records in an array, and sends items from the array when requested. There is no persistent storage in this version.
* `server-fileWriter.js` saves incoming records to a text file called `data.txt`, and sends items from the file when requested. This file exists even when the server is not running. 

The server programs are written for HTTP, not HTTPS, but if they are served from glitch.com, they will operate as HTTPS. So the Arduino client is written as an HTTPS client too. If you prefer to run the servers on your own host and not use HTTPS, be sure to adjust the Arduino client accordingly.

## The API
- GET /uid/records/startTime/endTime - returns all records from startTime to endTime.
  * uid is a client ID, a 9-byte ID in hexadecimal format
  * Datetime is in ISO8601 format (e.g. `2021-04-02T12:48:25Z`)

- POST /data - accepts a JSON record and adds it to the array

Expected JSON for the POST:
````
{ "uid": client ID, a 9-byte ID in hexadecimal format
  "date": date in ISO8601 format}
````
You can add any other JSON elements you want to the record.
The server does not read or write to anything but the date and the uid.

You can generate an ISO string from the current time in JavaScript like so: 

````
new Date().toISOString();
````

## The Clients

There are two clients here, 

* `index.html`, an HTML page in `/public` that sends and reads data. It reads data only from page load until the current time.
* `DataLoggerHttpClientJSON.ino` - an Arduino client that reads from a light sensor and sends to the server 