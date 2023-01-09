# tigoe-http-requests

This app is made to test HTTP client requests. You can send it most anything, as long as it's valid HTTP, and it will respond with info about your request. It's useful for testing HTML forms, [curl](https://curl.se/docs/manpage.html) requests, [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) requests, [Postman](https://web.postman.co/) requests, [ArduinoHttpClient](https://www.arduino.cc/reference/en/libraries/arduinohttpclient/) requests, custom [node.js](https://nodejs.org) requests, or any other platform you want to try. 

Here are a few examples to try:

GET request with query string in the URL:

````
curl 'https://tigoe-http-requests.glitch.me/?name=sam&age=99'
````

POST request with JSON-encoded body and Content-Type header:
````
curl 'https://tigoe-http-requests.glitch.me' -d '{"name":"bob", "age": 12}' -H 'Content-Type: application/json'
````

POST request with URL-encoded body:
````
curl 'https://tigoe-http-requests.glitch.me' -d 'name=mud&age=2'
````

GET request with RESTful path:
````
curl 'https://tigoe-http-requests.glitch.me/this/is/my/restful/path' 
````
