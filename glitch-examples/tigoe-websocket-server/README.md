# tigoe-websocket-server

A websocket server

This app makes a simple HTTP server using Express.js 
to serve static pages from the public directory, and it creates a webSocket server
for incoming webSocket clients. 

It listens for messages from all clients and broadcasts them to all clients.

There are two HTML pages in the public directory:
* index.html - creates a websocket client in plain JavaScript.
* p5/index.html - creates a websocket client in p5.js. 