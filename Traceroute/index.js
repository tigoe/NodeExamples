traceroute = require('traceroute');	// include the traceroute library
var destination = process.argv[2];	// get the site name from the command line

if (!destination) {
	console.log("You need to give a destination address. For example:");
	console.log("$ node index.js www.aho.no");
	console.log();
	process.exit(0);
} else {
	console.log("Tracing route to: " +destination);			// list the destination
}

// start the trace
traceroute.trace(destination, function (error,hops) {
  if (!error) console.log(hops);
});