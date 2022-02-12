#!/usr/bin/env node

// import the express app
const server = require('./app')
require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env

// which port to listen for HTTP(S) requests
const port = process.env.PORT || 3000

// call a function to start listening to the port
const listener = server.listen(port, function () {
  console.log(`Server running on port: ${port}`)
})

// a function to stop listening to the port
const close = () => {
  listener.close()
}

// export the close function
module.exports = {
  close: close,
}
