# tigoe-express-basics

Shows how to:
* serve static files
* respond to GET and POST requests
* parse the body of a POST request
* add JSON-formatted body to an array
* make a fetch() call in client-side JS

You can make a GET request to:
````
https://tigoe-express-basics.glitch.me/readings 
`````

Using curl, that would look like this:
````
curl 'https://tigoe-express-basics.glitch.me/readings'
````

and you'll get a reply of whatever readings that 
this express app has gotten since it's been running. 

You can also make a POST request to:
````
https://tigoe-express-basics.glitch.me/data
`````

Using curl, that would look like this:
````
curl 'https://tigoe-express-basics.glitch.me/readings'
````
and include some data in JSON format, and the app will save
your data in an array of readings. You can send your data as either
JSON, using the header `Content-Type: application/JSON` or you can
send it as URL-encoded, like so: `cats=1&dogs=0`

Using curl, it would look like this: 

````
curl -d '{cats:1, dogs:2}'  'https://tigoe-express-basics.glitch.me/data'

````

You can also make a GET request for:
````
https://tigoe-express-basics.glitch.me/
`````
and you'll get an HTML page. When you click the Fetch readings 
button, the page will use the JS fetch() API to get the 
readings using the `/readings` GET request above, and display 
the results.