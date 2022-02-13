import { useState, useEffect } from 'react'
import { useToken } from './useToken'

// custom React hook to get user data from the JWT token
export const useUser = () => {
  const [token, setToken] = useToken() // get the current token from our custom React useToken hook

  // a function to decode the payload data from the JWT
  const getPayloadFromToken = token => {
    try {
      const encodedPayload = token.split('.')[1] // payload data comes after the first . in the token
      return JSON.parse(atob(encodedPayload)) // decode the JSON from Base64 and then parse it as regular javascript object
    } catch (err) {
      return null
    }
  }

  // create a state variable for the user data with a default value of whatever is in the current token
  const [user, setUser] = useState(() => {
    if (!token) return null // if no token exists
    return getPayloadFromToken(token)
  })

  // whenever the token value changes, update the user info using our custom useUser React hook
  useEffect(() => {
    if (!token) {
      setUser(null) // no token = no user data
    } else {
      setUser(getPayloadFromToken(token))
    }
  }, [token])

  // return the user data
  return user
}
