
/*
  FileReadWrite
  a node.js app to read to and write from a file. 

  Shows how to write to and read from a file from node.
  You need to give two arguments on the command line: 
  * the file name to write to or read from
  * the string to write. 

  For example, to write hello world to data.txt type:
  $ node index.js data.txt 'hello world'
  to read from data.txt:
  $ node index.js data.txt
 
  This example is very basic, and doesn't include 
  security checks, so use with caution.
  
  created  17 Nov 2015
  modified 15 Jun 2024
  by Tom Igoe
	
*/
let fs = require('fs');       // require the fileSystem library
// command line arguments:
let filePath = process.argv[2]; // first argument is the file path
let inputString = process.argv[3];  // second argument is what to write

function fileWriteResponse() {
  console.log("Wrote the following content to the file " + filePath);
  console.log(inputString);
}

// if there's no arguments, tell them what to do:
if (!filePath && !inputString) {
  console.log(`You need to give two arguments on the command line: 
  * the file name to write to or read from 
  * the string to write. 
   
  For example, to write hello world to data.txt type: 
  $ node index.js data.txt 'hello world' 

  to read from data.txt: 
  $ node index.js data.txt`);
  return;
}

// if there's no input, just read the file; 
if (!inputString) {
  // Check to see if the file exists. if it doesn't, 
  // report the error. If it does, read from it:
  fs.access(filePath, fs.constants.R_OK, function (error) {
    fs.readFile(filePath, function (error, data) {
      // if something goes wrong, throw an error:
      if (error) {
        console.log(error);
        return;
      }
      // if you have a successful file read, print it:
      console.log(data.toString());
    });
  });
  // if there is an input string, write it to the file:
} else {
  // Check to see if the file exists. If so, append to it. 
  // If not, create it and write to it. 
  fs.access(filePath, fs.constants.F_OK, function (error) {
    // if the file doesn't exist (error) then create it 
    // and write to it:
    // append a newline to inputString:
    inputString += '\n';
    if (error) {
      fs.writeFile(filePath, inputString, fileWriteResponse);
    } else {
      // if the file does exist, then append to it:
      fs.appendFile(filePath, inputString, fileWriteResponse);
    }
  });
}