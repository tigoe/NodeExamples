# Node Examples

This is a collection of examples for node.js and express.js. Includes a short [intro to JavaScript patterns](IntroJavaScriptPatterns.md) in node.js. 

## Creating a a node.js Project

Node.js runs in a command line interface. You can edit your files in any editor you want. To make a new project, create a directory for it, then create a main script file, which is usually a server, then use npm to install any libraries you know you'll use and initialize a package decription called `package.json`. FOr example, if you were making a project using express.js to make a web server, you'd start the project like so:

````sh
$ mkdir project-dir 
$ cd project-dir
$ touch server.js
$ npm install express
$ npm init
````
 npm will ask you a series of questions to fill out the package description, then it will generate two files, `package.json` and `package-lock.json`, and a directory, `node_modules`.  The first, `package.json`, is your project description, and the second,`package-lock.json`, describes any changes that need to be made to `package.json` or `node_modules`. The directory `node_modules` is where npm downloads the libraries that you install, and any other dependencies. The two files, `package.json` and `package-lock.json`, should be included in any repository in which you store your files, so that the project can be recreated. 

## Installing an Existing Project

 To re-create a project downloaded from a remote repository change directories into the project and use npm to install the dependencies. If `package.json` and `package-lock.json` exist, the command `npm install` will read them and install all needed dependencies into `node_modules`. 

 ## Running a Project

 Once you've got everything installed, you can run a project from the command line with the main script's name like so:

 ````sh
 node server.js
 ````

 Type control-C to stop the project. If you need to run it in the background for as long as the host is running, consider using [PM2](https://pm2.keymetrics.io/docs/usage/quick-start/). 

## Running on Glitch.com

If you'd like to run these on [glitch.com](https://www.glitch.com) or [heroku](https://www.heroku.com/) or another node.js host, you may need to change the port number to comply with whatever port the platform runs your scripts on. On glitch.com, you can use:

````js
process.env.PORT || portnumber
````

in place of the port number given in these scripts. Some of them have been adjusted accordingly. 