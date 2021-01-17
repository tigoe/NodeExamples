/*
  File Uploader

 shows how to manage file uploads using express.js and multer.js
  note: upload fieldname must be the same as this, e.g 'image'.
  Use the HTML page public/uploader.html, or this curl example:
  curl  -F image=@path/to/yourImage.jpg 'http://localhost:8080/upload'

  Expects the file to be a JPG. Saves the file in the /upload directory.
*/
var express = require('express');   // include express.js
var multer  = require('multer');    // include multer.js as body parser
var server = express();             // initialize the server app

// set up file upload desintation and renaming callback:
var storage = multer.diskStorage({
  destination: 'uploads/',
  filename: renameFile
});

// use the express.static router to serve static files
// from the /publid directory:
server.use('/',express.static('public'));

// initialize multer bodyparser using storage options from above:
var upload = multer({storage: storage});
// set file type: single file, with the type "image"
// (the HTML form must have the same file handle for the uploaded file):
var type = upload.single('image');

// route handler for uploads:
function getUpload (request, response) {
  // print the file info from the request:
  var fileInfo = JSON.stringify(request.file);
  console.log(fileInfo);
  response.end( fileInfo + '\n');
}

// callback handler for file upload. This renames the file
// using the date and time of upload:
function renameFile(request, file, callback) {
  var newName = file.fieldname + '-' + new Date().getTime();
  // this calls a callback function in the multer library that renames the file:
  callback(null,newName);
}

// start the server:
server.listen(process.env.PORT || 8080);
// set a route for file upload POST requests:
server.post('/upload', type, getUpload);
