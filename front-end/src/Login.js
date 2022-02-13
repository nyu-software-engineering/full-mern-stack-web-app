import './Login.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useToken } from './auth/useToken.js'
import { useUser } from './auth/useUser.js'
import axios from 'axios'

/**
 * A React component that represents the Login page
 * @param {*} param0 an object holding any props and a few function definitions passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Login = props => {
  const [error, setError] = useState('')
  const [feedback, setFeedback] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useToken() // our custom React hook to get and set the JWT in the browser's local storage
  const user = useUser() // our custom React hook to get the user data from the token held in the browser's local storage
  const navigate = useNavigate()

  /**
   * A nested function that is called when the user submits the form to save a new Message.
   * @param {*} e
   */
  const handleLoginForm = e => {
    e.preventDefault() // prevent normal browser submit behavior

    // send data to server... getting server host name from .env environment variables file to make it easy to swap server hosts in one place
    axios
      // post new message to server
      .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/auth/log-in`, {
        email: email,
        password: password,
      })
      .then(response => {
        const token = response.data.token // extract the token from the server response
        // setFeedback(`ooh la la: ${token}`)
        setToken(token) // store the token in the browser's local storage
        navigate('/messages') // redirect the user to the messages page
      })
      .catch(err => {
        setError(`error error error! ${err}`)
      })

    // clear form
    // setEmail('')
    // setPassword('')
  }

  return (
    <>
      <form className="Login-form" onSubmit={handleLoginForm}>
        {feedback && <p className="MessageForm-feedback">{feedback}</p>}
        {error && <p className="MessageForm-error">{error}</p>}

        <h1>Log In</h1>
        <input
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input type="submit" disabled={!email || !password} value="Enter" />
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </>
  )
}

// make this component available to be imported into any other file
export default Login
