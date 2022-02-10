import { useState } from 'react'
import axios from 'axios'
import './MessageForm.css'

const MessageForm = ({ props }) => {
  // create a state variable for each form field
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [feedback, setFeedback] = useState('')
  const [error, setError] = useState('')

  const submitForm = e => {
    e.preventDefault() // prevent normal browser submit behavior

    // send data to server... getting server host name from .env environment variables file to make it easy to swap server hosts in one place
    axios
      .post(`//${process.env.REACT_APP_SERVER_HOSTNAME}`)
      .then(data => {
        setFeedback(`ooh la la: ${data}`)
      })
      .catch(err => {
        setError(`error error error! ${err}`)
      })

    // clear form
    setName('')
    setMessage('')
  }

  return (
    <form className="MessageForm-form" onSubmit={submitForm}>
      {feedback && <p className="MessageForm-feedback">{feedback}</p>}
      {error && <p className="MessageForm-error">{error}</p>}
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <textarea
        placeholder="Enter a message"
        onChange={e => setMessage(e.target.value)}
        value={message}
      />
      <input type="submit" disabled={!name || !message} value="Save" />
    </form>
  )
}

export default MessageForm
