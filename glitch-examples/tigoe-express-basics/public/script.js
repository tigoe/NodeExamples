function fetchJSON() {
  // make the HTTP/HTTPS call:
  fetch('/readings')
    // then convert response to JSON
    .then(response => response.json())  
    // then get the body of the response
    .then(data => getResponse(JSON.stringify(data)))  
    // if there is an error
    .catch(error => getResponse(error));
}


// function to call when you've got something to display:
function getResponse(data) {
  // make a string to eventually put in the HTML:
  let formattedResult = "";
  // get the readings as a JSON array:
  let readings = JSON.parse(data);
  // iterate over the array:
  for (var r in readings) {
    // add each reading to the formatted result with a <br>
    formattedResult += JSON.stringify(readings[r]) + "</br>";
  }
  // put the result in the result div:
  document.getElementById('result').innerHTML = formattedResult;
}