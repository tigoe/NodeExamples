# Node Time Server

This server script shows how to use the JS Date object to 
make timestamps and calculate uptime of a server. 

The server serves an index.html page from the /public directory,
and has a single API endpoint, a GET request for `/time`, which returns:
````
{
   reqTime: the time of the request according to the server's clock,
   timeSinceLast: the time since the last request from any client,
   startTime: the start time of the server,
   upTime: the time that the server has been running
}
````

It shows how to use Date objects to get the difference between times, 
and how to convert a Date string into a day, hour, minute, second time difference.

created 27 April 2022 \
by Tom Igoe