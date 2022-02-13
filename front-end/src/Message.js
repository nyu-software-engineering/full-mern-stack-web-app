import './Message.css'

/**
 * A React component that represents one Message in the list of messages.
 * @param {*} param0 an object holding any props and a few function definitions passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Message = ({ message }) => {
  // format the date of the message nicely
  const date = new Date(message.createdAt).toLocaleDateString()
  const time = new Date(message.createdAt).toLocaleTimeString()

  return (
    <>
      <article className="Message-article">
        <h2>{message.name}</h2>
        <p>{message.message}</p>
        <time>
          {date} at {time}
        </time>
      </article>
    </>
  )
}

// make this component available to be imported into any other file
export default Message
