let responseDiv;

// this function is called when the page is loaded. 
function setup(event) {
  // get the response div from the HTML:
  responseDiv = document.getElementById('myDiv');
  // set a 5-second interval to run getTime():
  setInterval(getTime, 5000);
}

// this function is called by the setInterval in the setup:
function getTime() {
  // fetch from the server:
  fetch('/time/' + 'America/New_York')
    .then(response => response.json())
    .then(json => {
      // get the datetime from the response as a Date object:
      let now = new Date(json.datetime);
      // convert Date to a locale Time String:
      let nowString = now.toLocaleTimeString();
      // get the relevant bits of the JSON response:
      myDiv.innerHTML = "The time in ";
      myDiv.innerHTML += json.timezone;
      myDiv.innerHTML += " is ";
      myDiv.innerHTML += nowString;
      myDiv.innerHTML += '<br>';
      myDiv.innerHTML += 'timezone: ';
      myDiv.innerHTML += json.abbreviation;
      myDiv.innerHTML += ', or ' + json.utc_offset + ' GMT';
    });
}

// This is a listener for the page to load.
// This is the command that actually starts the script:
window.addEventListener('DOMContentLoaded', setup);