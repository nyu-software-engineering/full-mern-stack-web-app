import { useState } from 'react'
import axios from 'axios'
import './MessageForm.css'

/**
 * A React component that represents a form the user can fill out to create and post a new Message.
 * @param {*} param0 an object holding any props and a few function definitions passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const MessageForm = ({ setError, setFeedback, addMessageToList }) => {
  // create a state variable for each form field
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  /**
   * A nested function that is called when the user submits the form to save a new Message.
   * @param {*} e
   */
  const submitForm = e => {
    e.preventDefault() // prevent normal browser submit behavior

    // send data to server... getting server host name from .env environment variables file to make it easy to swap server hosts in one place
    axios
      // post new message to server
      .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/messages/save`, {
        name: name,
        message: message,
      })
      .then(response => {
        // setFeedback(`ooh la la: ${data}`)
        addMessageToList(response.data.message)
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

// make this component available to be imported into any other file
export default MessageForm
