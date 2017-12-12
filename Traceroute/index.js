const Traceroute = require('nodejs-traceroute');	// include the traceroute library
var destination = process.argv[2];	// get the site name from the command line

if (!destination) {
	console.log("You need to give a destination address. For example:");
	console.log("$ node index.js www.aho.no");
	console.log();
	process.exit(0);
} else {
	console.log("Tracing route to: " + destination);			// list the destination
}

try {
	const tracer = new Traceroute();				// make a new instance of the library

	// callbacks for hop and close listeners:
	function printHop(hop) {
		console.log('hop: ' + JSON.stringify(hop));
	}

	function printEnd() {
		console.log('end of trace');
	}
	// set listeners for hop and close events:
	tracer
	.on('hop', printHop)
	.on('close', printEnd);

	// start the trace:
	tracer.trace(destination);
} catch (exception) {				// if there's a problem
	console.log(exception);		// print what the problem was
}
