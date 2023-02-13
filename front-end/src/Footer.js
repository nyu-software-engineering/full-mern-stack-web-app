import './Footer.css'

/**
 * A React component that is used for the footer displayed at the bottom of every page of the site.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Footer = props => {
  return (
    <footer className="Footer-footer">
      &copy;2027. Foo Barstein. All rights reserved.
    </footer>
  )
}

// make this component available to be imported into any other file
export default Footer
