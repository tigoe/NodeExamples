# Websocket Examples

These examples use two different server-side websocket libraries, [ws](https://www.npmjs.com/package/ws) and [express-ws](https://www.npmjs.com/package/express-ws). The latter is just like the former, but integrates better with express.js, so you can just declare the websocket connection as a route. 

## Servers
* [ExpressWsServer](ExpressWsServer/) - a server example using [express-ws](https://www.npmjs.com/package/express-ws) and [express.js](https://expressjs.com/). 
* [wsServerExample](wsServerExample/) - a server example using [ws](https://www.npmjs.com/package/ws) - a server example using ws and [express.js](https://expressjs.com/)

## Clients
These clients are duplicated in the `public` directory of each of the servers
* [wsClientExample](wsClientExample/) - a node.js command-line client
* [jsClient](ArduinoWebsocketClient/) - a browser-based example in native JavaScript
* [p5jsClient](ArduinoWebsocketClient/) - a browser-based example in p5.js
* [ArduinoWebsocketClient](ArduinoWebsocketClient/) - an Arduino client using the ArduinoHttpClient library




