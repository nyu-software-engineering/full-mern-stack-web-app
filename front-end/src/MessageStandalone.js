import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import loadingIcon from './loading.gif'
import './Message.css'

/**
 * A React component that represents one Message that is NOT loaded in a list of messages
 * @param {*} param0 an object holding any props and a few function definitions passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const MessageStandalone = ({ message }) => {
  // this component expects to be loaded outside of a list of messages, i.e. not within the Messages component
  // it is passed an id and must load the message data for that message from the server

  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false) // make loading icon appear by default until message data is loaded from server
  // state variables to hold the message data
  const [msgName, setMsgName] = useState('Loading...')
  const [msgBody, setMsgBody] = useState('Loading...')
  const [msgDate, setMsgDate] = useState(new Date().toLocaleDateString()) // default to current time
  const [msgTime, setMsgTime] = useState(new Date().toLocaleTimeString()) // default to current time

  const { messageId } = useParams() // get any params passed to this component from the router

  // fetch the data once when the component first renders
  useEffect(() => {
    // need to load the message data from the server once
    // immediately invoke a function fetch the desired message from the server
    const fetchMessage = async messageId => {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/messages/${messageId}`
      )
      // console.log(JSON.stringify(response.data))
      // assuming we receive an array of messages with the matching message in first position...
      const msg = response.data.messages[0]
      // console.log(JSON.stringify(msg, null, 2))
      // set all the state variables to hold the message data
      setMsgName(msg.name)
      setMsgBody(msg.message)
      setMsgDate(new Date(msg.createdAt).toLocaleDateString())
      setMsgTime(new Date(msg.createdAt).toLocaleTimeString())
      setLoaded(true) // make the loading icon go away
    }

    fetchMessage(messageId) // get this message from the server
  }, [])

  return (
    <>
      <h1>Message Details</h1>
      <p>
        This page shows just the contents of this one message. Go back to{' '}
        <Link to="/messages">see all</Link>
      </p>
      {error && <p className="MessageForm-error">{error}</p>}
      {/* show loading icon until message loads */}
      {!loaded && <img src={loadingIcon} alt="loading" />}{' '}
      {loaded && (
        <article className="Message-article">
          <h2>{msgName}</h2>
          <p>{msgBody}</p>
          <time>
            {msgDate} at {msgTime}
          </time>
        </article>
      )}
    </>
  )
}

// make this component available to be imported into any other file
export default MessageStandalone
