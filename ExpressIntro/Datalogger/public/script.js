let luxInput, ctInput, loadTime;
let now;
// unique ID, a 9-byte number in hexadecimal format:
let myUid = "AA00BB11CC22DD33EE";
function setup(event) {
// make variables of the lux and ct inputs:
  luxInput = document.getElementById("lux");
  ctInput = document.getElementById("ct");
  
  // set a listener to send the reading when the button is pressed:
  const sendInput = document.getElementById('send');
  sendInput.addEventListener('click', postJSON);
  const readInput = document.getElementById('request');
  readInput.addEventListener('click', fetchJSON);

  // get the start time element and put the current time in it:
  loadTime = new Date();
  let startTimeSpan = document.getElementById("startTime");
  startTimeSpan.innerHTML = loadTime.toLocaleString();

  // set an interval function to run once a second:
  setInterval(setTime, 1000);
}

function fetchJSON() {
  // make the HTTP/HTTPS call:
  let start = loadTime.toISOString();
  fetch("/" + myUid + "/records/" + loadTime.toISOString() + "/" + now.toISOString())
    .then(response => response.json()) // convert response to JSON
    .then(data => getResponse(JSON.stringify(data))) // get the body of the response
    .catch(error => getResponse(error)); // if there is an error
}

function postJSON() {
  // parameters for the HTTP/S call
  let postData = { uid: myUid, 
                  dateTime: now.toISOString(), 
                  lux: luxInput.value, 
                  ct: ctInput.value };
  let params = {
    method: "POST", // HTTP method
    headers: {
      // any HTTP headers you want can go here
      "Content-Type": "application/JSON"
    },
    body: JSON.stringify(postData)
  };
  // make the HTTP/S call:
  fetch("/data", params)
    .then(response => response.json()) // convert response to text
    .then(data => getResponse(JSON.stringify(data))) // get the body of the response
    .catch(error => getResponse(error)); // if there is an error
}

// function to call when you've got something to display:
function getResponse(data) {
  document.getElementById("result").innerHTML = data;
}
function setTime() {
  // get current date and time:
  now = new Date();
  // get the time span element and put the time in it:
  let timeSpan = document.getElementById("endTime");
  timeSpan.innerHTML = now.toLocaleString();
}

// This is a listener for the page to load.
// This is the command that actually starts the script:
window.addEventListener("DOMContentLoaded", setup);