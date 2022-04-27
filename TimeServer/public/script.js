// Browser client script in plain JS

let now = new Date();

// this function is called when the DOM is loaded:
function setup(event) {
  // get the start time element and put the current time in it:
  let loadTime = new Date();
  let startTimeSpan = document.getElementById("startTime");
  startTimeSpan.innerHTML = loadTime.toLocaleString();

  // set an interval function to run once a second:
  setInterval(setTime, 1000);
}

// this function sets the date in the page, and requests
// the /time API from the server:
function setTime() {
  // get current date and time:
  now = new Date();
  // get the time span element and put the time in it:
  let timeSpan = document.getElementById("currentTime");
  timeSpan.innerHTML = now;
  fetchJSON();
}

// this function is called by the setTime function:
function fetchJSON() {
  // make the HTTP/HTTPS call:
  fetch("/time")
    .then((response) => response.json()) // convert response to JSON
    .then((data) => getResponse(JSON.stringify(data))) // get the body of the response
    .catch((error) => getResponse(error)); // if there is an error
}

// function to call when you've got something to display:
function getResponse(data) {
  let readings = JSON.parse(data);

  // the elements of readings are all strings. Convert them back to dates:
  document.getElementById("startTime").innerHTML = new Date(readings.startTime);
  document.getElementById("lastRequestTime").innerHTML = new Date(
    readings.reqTime
  );

  // convert readings.startTime back to a date and get the difference:
  let uptimeDate = now - new Date(readings.startTime);
  // calculate the uptime:

  // get the uptimeDate in seconds:
  let upNow = Math.floor(uptimeDate / 1000);
  // get the seconds part:
  let upSecs = Math.floor(upNow % 60);
  // get the minutes part (3600 secs to an hour):
  let upMins = Math.floor((upNow % 3600) / 60);
  // get the hours part (86400 secs to a day):
  let upHours = Math.floor((upNow % 86400) / 3600);
  // get the days part (31556926 secs to a year):
  let upDays = Math.floor((upNow % 31556926) / 86400);

  // make a string and put it in the document:
  let uptimeString = upDays + " days, " + upHours + ":" + upMins + ":" + upSecs;
  document.getElementById("upTime").innerHTML = uptimeString;

  // finally put the raw JSON in the result field:
  document.getElementById("result").innerHTML = JSON.stringify(readings);
}

// This is a listener for the page to load.
// This is the command that actually starts the script:
window.addEventListener("DOMContentLoaded", setup);
