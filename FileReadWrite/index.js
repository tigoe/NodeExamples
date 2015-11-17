

var fs = require('fs');       // require the fileSystem library
var input = process.argv[2];  // get the data from the command line

// You'll deal with a file in the same directory as this script:
var fileName = __dirname + "/data.txt";

//--------------- callback functions for fs.exists
function writeToFile(exists) {
  //  write success callback function:
  function success(data) {
    console.log('I wrote to the file: ' + input);
  }
  //  if a file exists at the given filePath, add to the end of the file.
  //  Otherwise create it and write to it
  if (exists) {
    fs.appendFile(fileName, input, success);
  } else {
    fs.writeFile(fileName, input, success);
  }
}

function readFromFile(exists) {
  // read success callback function:
  function success(error, data) {
    if (error) {
      console.log(error);
    } else {
      console.log("File contents: " + data);
    }
  }
  // if the file exists, read from it:
  if (exists) {
    fs.readFile(fileName, success);
  }
}
// if file exists, append. If not, create and write:
fs.access(fileName, writeToFile);
// if file exists, read from it:
fs.access(fileName, readFromFile);
