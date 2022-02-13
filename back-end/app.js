require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env
const express = require('express') // CommonJS import style!
const morgan = require('morgan') // middleware for nice logging of incoming HTTP requests
const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express() // instantiate an Express object
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' })) // log all incoming requests, except when in unit test mode.  morgan has a few logging default styles - dev is a nice concise color-coded style
app.use(cors()) // allow cross-origin resource sharing

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

// connect to database
mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`)
  .then(data => console.log(`Connected to MongoDB`))
  .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))

// load the dataabase models we want to deal with
const { Message } = require('./models/Message')
const { User } = require('./models/User')

// a route to handle logging out users
app.get('/messages', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({})
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})

// a route to handle logging out users
app.post('/messages/save', async (req, res) => {
  // try to save the message to the database
  try {
    const message = await Message.create({
      name: req.body.name,
      message: req.body.message,
    })
    return res.json({
      message: message, // return the message we just saved
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      error: err,
      status: 'failed to save the message to the database',
    })
  }
})

app.post('/auth/sign-up', async (req, res) => {
  const { email, handle, password } = req.body
  let user = await User.findOne({ email })
  if (user) {
    // a user already exists with this email address
    return res.status(409).json({
      error: 'User already exists',
      status: 'A user already exists with this email address',
    })
  }

  // create our new user document in the database
  const passwordHash = await bcrypt.hash(password, 10) // encrypt the password so we don't store it as plain text
  user = {
    email,
    handle,
    passwordHash,
  }
  user = User.create(user) // create the new user

  // send back a jwt
  jwt.sign(
    {
      _id: user._id,
      email: user.email,
      handle: user.handle,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '2d',
    },
    (err, token) => {
      if (err) {
        return res.status(500).send({
          // signing JWT failed
          error: err,
          status: 'Failed to sign the JWT',
        })
      }
      // signing JWT succeeded
      return res.json({
        token,
      })
    }
  )
})

app.post('/auth/log-in', async (req, res) => {
  const { email, password } = req.body

  // try to find a user with this email address
  const user = await User.findOne({ email })
  if (!user) {
    // a user doesn't exist
    return res.status(401).json({
      error: 'User not found',
      status: 'No user exists with this email address',
    })
  }

  // make sure the passwords match
  const isPasswordsMatch = bcrypt.compare(password, user.passwordHash)
  if (!isPasswordsMatch) {
    res.status(401).json({
      error: 'Password incorrect',
      status: 'The supplied password is not correct for this user',
    })
  }

  // send back a jwt
  jwt.sign(
    {
      _id: user._id,
      email: user.email,
      handle: user.handle,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '2d',
    },
    (err, token) => {
      if (err) {
        // signing JWT failed
        return res.status(500).send({
          error: err,
          status: 'Failed to sign the JWT',
        })
      }
      // signing JWT succeeded
      res.json({
        token,
      })
    }
  )
})

// export the express app we created to make it available to other modules
module.exports = app // CommonJS export style!
