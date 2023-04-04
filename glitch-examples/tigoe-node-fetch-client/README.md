# tigoe-node-fetch-client
 
This example shows how to use node.js to make requests to a RESTful API and simplify the result and serve it as a RESTful API. It assumes you're using a microcontroller-based client or have some other reason for needing the results of an API to be simplified. 
 
The calling client can change any of the properties of the query string and they'll be replaced.
 
The app makes a call to NOAA's Tides and Currents API. Defaults to NYC Battery Station. see [this link](https://api.tidesandcurrents.noaa.gov/api/prod/responseHelp.html) for details. The return from the NOAA site looks like this:
    
````
{"metadata":{"id":"8518750","name":"The Battery","lat":"40.7006","lon":"-74.0142"},"data":[{"t":"2023-01-09 10:48", "v":"0.752", "s":"0.027", "f":"1,0,0,0", "q":"p"}]}
````
    
The summarized version from this app looks like this:
````
{"time":"2023-01-09 21:24","waterLevel":"0.536"}
````

This same approach could be adapted to any complex RESTful API. If goes like this:

*  initialize express and the server, and a fetch instance too
*  set values for the API request URL as a string and the query  as a JSON object
*  set the fetch parameters as a JSON object
*  start an express.js-based HTTP server and listen for GET requests
*  When you get a request, handle it as follows:
    * iterate over the incoming query string
    * if it contains any properties in the query variable set above, update them with the new values from the incoming query string
    * convert the query to a string and append it to the request URL
    * make a `fetch()` request with it
    * when you get a result, iterate over it to see if it's valid.
        * if it isn't, return an error to the client
        * if it is, extract the most important properties and return those as JSON to the client