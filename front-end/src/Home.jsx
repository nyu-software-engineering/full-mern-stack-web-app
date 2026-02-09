import { Link } from 'react-router-dom'
import './Home.css'

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Home = props => {
  return (
    <>
      <h1>Hello and welcome!</h1>
      <p>This is a full MERN-stack app, whether you like it or not!</p>
      <p>
        Check out the <Link to="/messages">messages page</Link>.
      </p>
    </>
  )
}

// make this component available to be imported into any other file
export default Home
