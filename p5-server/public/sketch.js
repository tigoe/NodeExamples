
/*
	p5.js form example
	Creates a simple form and sends it to a server as a GET request

	created May 2016
	by Tom Igoe
*/

var responseDiv, sendButton;		// make a button and a text div
var nameField, ageField;				// text input fields

function setup() {
	nameField = createInput('enter your name here');		// create the input fields
	ageField = createInput('enter your age here');
	sendButton = createButton('Send to server');				// create button
	responseDiv = createDiv('Waiting for response');		// create text div
	nameField.position(10, 10);													// position them
	ageField.position(10, 40);
	sendButton.position(10, 70);
	responseDiv.position(10, 100);
	sendButton.touchEnded(sendRequest);					// give the button a behavior
}

function sendRequest() {
	// make a HTTP request with the client data:
	httpGet('/name/'+ nameField.value() + '/age/' + ageField.value(), getResponse);
}

function getResponse(data) {
	responseDiv.html(data);							// show the server's response in the div
	var result = JSON.parse(data);			// parse the response into a JSON object
	console.log("name:" + result.name);				// get the elements of the object
	console.log("comment:" + result.comment);
}
