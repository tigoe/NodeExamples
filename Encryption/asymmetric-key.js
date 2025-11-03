/*
encryption and decryption script
Takes a text string and a public key to make an encrypted file,
or takes an encrypted file and a private key to 
read the encrypted file. 
Uses node.js' built-in crypto.js library.

First, you need to generate a public and private key pair, like so:
Private key:
$ openssl genrsa -out private_key.pem 4096
Public key:
openssl rsa -pubout -in private_key.pem -out public_key.pem

Once you have generated the keys,
to run this script to encrypt a string
and save it to a file, type:
$ node asymmetric-key.js encrypt string filename

To decrypt a file encrypted with the public key:
$ node asymmetric-key.js decrypt filename

For more, see the crypto.js documentation: 
https://nodejs.org/api/crypto.html

Created 27 Nov 2022
by Tom Igoe

*/
// include the crypto and filesystem libraries:
var crypto = require('crypto');
var fs = require('fs');

// set the options for encryption and decryption.
// do not include the keys, they'll be added 
// in the encrypt and decrypt functions:
let options = {
  padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
  oaepHash: 'sha256'
};

let inputText, fileName;

// take input from the command line.
// second element from the command line is the command:
let command = process.argv[2];

switch (command) {
  case 'encrypt': // if the command is 'encrypt'
    // if encrypting, third element is the text to encrypt:
     inputText = process.argv[3];
    // fourth element is the file to store the encrypted message in:
     fileName = process.argv[4];
    if (!inputText || !fileName) {
      console.log('You need to include a text string to encrypt and a filename in which to encrypt it.')
    } else {
      // encrypt the text:
      let result = encryptText(inputText, fileName);
    }
    break;
  case 'decrypt': // if the command is 'decrypt'
    // if decrypting, third element is the file to decrypt:
    fileName = process.argv[3];
    // make sure there's a filename:
    if (!fileName) {
      console.log('You need to give a filename to decrypt.')
    } else {
      decryptText(fileName);
    }
    break;
  default: // if the command is anything else:
    console.log('commands: \n\
  Encrypt a string in a file: \n\
  $ node asymmetric-key.js encrypt filename \n\
   \n\
  Decrypt a file encrypted with the public key: \n\
  $ node asymmetric-key.js decrypt filename');
}

///////////////

function encryptText(someText, someFile) {
  // set the public key for encrypting:
  options.key = fs.readFileSync('public_key.pem', 'utf8');
  // make a Buffer from the input text:
  let msg = Buffer.from(someText);
  // encrypt it with the public key:
  let result = crypto.publicEncrypt(options, msg);

  // write the encrypted message to the file:
  fs.writeFileSync(someFile, result);
  // clear the public key:
  options.key = '';
}

function decryptText(someFile) {
  // read the private key:
  options.key = fs.readFileSync('private_key.pem', 'utf8');
  // read the encrypted file:
  let input = fs.readFileSync(someFile);
  // decrypt it with the private key:
  let result = crypto.privateDecrypt(options, input);
  // print it:
  console.log('result is: ' + result.toString());
  // clear the key:
  options.key = '';
}