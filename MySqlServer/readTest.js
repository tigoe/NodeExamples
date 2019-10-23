var read = require("read")
var user = {};

function getUser(error, username) {
  user.name = username;
  read({ prompt: "Password: ", silent: true }, getPassword);
}

function getPassword(error, passwd) {
  user.pass = passwd;
  console.log(user);
}

read({ prompt: "Username: "}, getUser);