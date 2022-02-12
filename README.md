A monorepo containing:

- a front-end built with [React.js](https://reactjs.org)
- a back-end built with [Express.js](http://express.js.com)
- a [MongoDB](https://mongodb.com) database connected to the back-end with [mongoose](https://mongoosejs.com)

## How to launch the app

### Get the code

1. Clone this repository to your local machine
2. Navigate into the project directory

### Build and launch the back end

1. Navigate into the `back-end` directory
1. Run `npm install` to install all dependencies listed in the `package.json` file.
1. Run `npm start` to launch the back-end server

### Launch the front end

1. Navigate into the `front-end` directory
1. Run `npm install` to install all dependencies listed in the `package.json` file.
1. Run `npm start` to launch the React.js server

### Build and launch the database

- install and run [docker desktop](https://www.docker.com/get-started)
- create a [dockerhub](https://hub.docker.com/signup) account
- run command, `docker run --name mongodb_dockerhub -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=secret -d mongo:latest`

### Visit the web app in your web browser

- install [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- navigate your web browser to http://localhost:3000

## How the project was intiially set up from scratch...

How the project was intially set up

- `mkdir my_project` to create project folder
- `cd my_project` to go into the folder

Initial set up of React.js front end:

- go into the main project folder and...
- `npx create-react-app front-end` - to create a boilerplate React project for the front-end
- `cd front-end` - to go into the folder that has been created
- `npm install react-router-dom` - to install useful routing functionality
- `npm install axios` - to install a useful module for making requests to servers
- added `.env` file with port setting at which to run React locally when developing
- ran `npm start` to start up the local React development server
- start building out the rest of the code in the `src` directory

Initial set up of Express.js back end:

- go into the main project folder and...
- `mkdir back-end` to create a folder that will hold the back-end code
- `cd back-end` - to go into the folder
- `npm init -y` - to initialize this folder as an npm-powered project
- `npm install -g nodemon` - to globally install a useful module for hot restarting of the server code
- `npm install express` - install the main server framework
- `npm install mongoose` - to install a useful module for dealing with MongoDB databases
- `npm install dotenv` - to install a useful module for reading environment variables from `.env` files
- `npm install cors` - to install a useful module for allowing [cross-origin requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- create `.env` file to hold MongoDB database credentials, express server port, and other sensitive data
- create initial `server.js` and `app.js` files to set up a basic express server
- edit the `package.json` file and set the `main` property to have the value, `server.js`
- ran `nodemon index` to start the server and auto-restart with any change saved to any file.
- try out some example server routes using [Postman](https://www.postman.com/)
- start building out the rest of the code in the `src` directory

Initial set up of MongoDB database:

- install and run [docker desktop](https://www.docker.com/get-started)
- create a [dockerhub](https://hub.docker.com/signup) account
- run command, `docker run --name mongodb_dockerhub -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=secret -d mongo:latest`
- run command, `docker ps` to verify docker is running and note the port number
- access the mongo shell with `docker exec -it mongodb_dockerhub mongo -u admin -p secret`
- run command, `show dbs` within the mongo shell to see a list of databases
- type `exit` to quit the shell after you confirm it is working
