/*
	hue-node-api discover and get config
	This example searches the LAN for hue hubs, and prints out their basic 
	details. Then it takes the first hub found and prints the detailed config
	The example uses the promises interface to node-hue-api.
	
	created 6 Feb 2015
	modified 16 Feb 2015
	by Tom Igoe
	
	Based on the examples in the node-hue-api readme:
	https://github.com/peter-murray/node-hue-api
*/

var hue = require("node-hue-api"),			// include the node-hue-api library
	HueApi = hue.HueApi;							// make a local instance of HueApi
	
var username = 'thomaspatrickigoe',			// your app's username, ten chars or longer
	address;											// hub IP address


// print a JSON object nicely:
function displayResult(result) {
   console.log(JSON.stringify(result, null, 2));
};
	

function displayBridges(thisBridge) {
   console.log("Hue Bridges Found: ");		// print the list of bridges found
   displayResult(thisBridge);
  if (thisBridge.length > 0) { 
	   // pull out the first bridge found:
	   address = thisBridge[0].ipaddress;
	   
	   /* 
			get the detailed config for the bridge.
	    	if the username above is registered to the bridge,
		 	you'll get the detailed config. Otherwise you'll only get the short details:
		*/
	   var api = new HueApi(address, username);
	    api.getConfig()			// get the config
	    	.then(displayResult)	// if successful, display what you got
	    	.done();
   }
}

 hue.nupnpSearch()			// start a search on the LAN for hubs
 	.then(displayBridges)	// if successful, display the details
 	.done();

