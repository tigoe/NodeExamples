# Node Examples

This is a collection of examples for node.js and express.js. Includes a short [intro to JavaScript patterns](IntroJavaScriptPatterns.md) in node.js. 

The most up-to-date examples are:
* [ExpressIntro](ExpressIntro) - this section contains a many examples using [express.js](https://expressjs.com), including:
  * [FourLineServer](ExpressIntro/FourLineServer/) - a minimal static file server
  * [staticPages](ExpressIntro/staticPages.js) - shows how to serve static pages as well as dynamic routes
  * [getPost](ExpressIntro/getPost.js) - shows how to handle GET and POST requests, and how to handle json request data and form-urlencoded data
  * [getPostPutDelete](ExpressIntro/getPostPutDelete.js) - shows how to use express.js .all() function to listen for any type of request (GET, POST, PUT, DELETE)
  * [requestHeaders](ExpressIntro/requestHeaders.js) - shows how to get the raw headers of an HTTP request
  * [restParameters](ExpressIntro/restParameters.js) - shows how to read RESTful parameters from the route of a request. 
  subroutes
  * [fileUploader](ExpressIntro/fileUploader.js) - shows how to use multer.js to make a web page that can upload files to your server. 
  routes
  * [subroutes](ExpressIntro/subroutes.js) - shows how to handle different RESTful subroutes
* [glitch-examples](glitch-examples/) - these are examples for express.js, mqtt.js, websockets using ws.js, and  node-fetch.js  that I've posted on [glitch.com](https://glitch.com/@tigoe). Some of these duplicate the express intro examples above.
* [HTTPS server](HttpsServer) - shows how to use express to respond to HTTPS requests. 
* [SerialIntro](SerialIntro) - a few examples showing how to use Serialport.js
 
There are other examples in the [main directory](/) as well. 


## Creating a node.js Project

Node.js runs in a command line interface. You can edit your files in any editor you want. A typical node.js project has the following structure:

* ProjectDirectory/
  * main_script.js    - your main JavaScript program
  * package.json      - a manifest of dependencies
  * Package-lock.json - describes any changes that need to be made to package.json
  * public/           - a directory for static files
    * index.html      - static files to be served
    * style.css
    * script.js

To make a new project, create a directory for it, then create a main script file, which is usually a server, then use npm to install any libraries you know you'll use and initialize a package decription called `package.json`. For example, if you were making a project using express.js to make a web server, you'd start the project like so:

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
$ node server.js
 ````

 Type control-C to stop the project. If you need to run it in the background for as long as the host is running, consider using [PM2](https://pm2.keymetrics.io/docs/usage/quick-start/). 

## Running on Glitch.com

If you'd like to run these on [glitch.com](https://www.glitch.com) or [heroku](https://www.heroku.com/) or another node.js host, you may need to change the port number to comply with whatever port the platform runs your scripts on. On glitch.com, you can use:

````js
process.env.PORT || portnumber
````

in place of the port number given in these scripts. Some of them have been adjusted accordingly. 