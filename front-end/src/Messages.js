import { useState, useEffect } from 'react'
import axios from 'axios'
import './Messages.css'
import loadingIcon from './loading.gif'
import MessageForm from './MessageForm'
import Message from './Message'

const Messages = ({ props }) => {
  const [messages, setMessages] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

  // load data from server
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}`)
      .then(response => {
        setMessages(response.data)
      })
      .catch(err => {
        setError(err)
      })
      .finally(() => {
        // the response has been received, so remove the loading icon
        setLoaded(true)
      })
  }, []) // putting a blank array as second argument will cause this function to run only once when component first loads

  return (
    <>
      <h1>Leave a message!</h1>
      <MessageForm />

      {error && <p className="Messages-error">{error}</p>}
      {!loaded && <img src={loadingIcon} alt="lodaing" />}
      {messages.map(message => (
        <Message key={message.id} props={message} />
      ))}
    </>
  )
}

export default Messages
