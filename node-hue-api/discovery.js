/*
	node-hue-api discover and get config
	This example searches the LAN for hue hubs, and prints out their basic 
	details. Then it takes the first hub found and prints the detailed config
	The example uses the promises interface to node-hue-api.
	
	created 6 Feb 2015
	modified 16 Feb 2015
	by Tom Igoe
	
	Based on the examples in the node-hue-api readme:
	https://github.com/peter-murray/node-hue-api
	
	to call this from the commandline:
	node discovery.js address username
	or 
	node discovery.js address
	or 
	node discovery.js
*/

var hue = require("node-hue-api"),			// include the node-hue-api library
	HueApi = hue.HueApi,							// make a local instance of HueApi
	hub; 												// will hold the hub info when you instantiate it
	
var username = process.argv[3],				// your app's username from the command line
	address = process.argv[2];					// hub IP address from command line
	

// print a JSON object nicely:
function displayResult(result) {
   console.log(JSON.stringify(result, null, 2));
}

function displayConfig() {
		   /* 
			get the detailed config for the bridge.
	    	if the username above is registered to the bridge,
		 	you'll get the detailed config. Otherwise you'll only get the short details:
		*/
	   hub.getConfig()			// get the config
	   	.then(displayResult)	// if successful, display what you got
			.done();
}

function displayBridges(bridges) {
	console.log("Hue Bridges Found: ");		// print the list of bridges found
	displayResult(bridges);
	if (bridges.length > 0) { 
	   // pull out the first bridge found:
	   for (thisBridge in bridges) {
	   	address = bridges[thisBridge].ipaddress;
			displayConfig(address);
	   }
	}
}

//----------------------------------
// This is where execution of the script starts

if (!username) {									// if no command line username,
	username = 'atleasttenletters';			// make one up
}

if (address) {										// if there's a command line address,
	hub = new HueApi(address, username);	// instantiate the hub
	displayConfig();								// get the config for that hub
} else {												// if not, 
	hue.nupnpSearch()								// start a search on the LAN for hubs
		.then(displayBridges)					// if successful, display the details
		.done();
}
