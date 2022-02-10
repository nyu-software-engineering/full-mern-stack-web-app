import './Message.css'

const Message = ({ props }) => {
  // format the date of the message nicely
  const date = new Date(parseInt(props.created)).toLocaleDateString()
  const time = new Date(parseInt(props.created)).toLocaleTimeString()
  return (
    <>
      <article className="Message-article">
        <h2>{props.name}</h2>
        <p>{props.message}</p>
        <time>
          {date} at {time}
        </time>
      </article>
    </>
  )
}

export default Message
