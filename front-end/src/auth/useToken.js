import { useState } from 'react'

// a custom React hook to get and set the JWT from local storage
export const useToken = () => {
  // a private state variable that by default holds any token currently in the browser's local storage
  const [token, setTokenInternal] = useState(() => {
    return localStorage.getItem('token')
  })

  // public setter to update the token value in local storage and update the state variable
  const setToken = newToken => {
    localStorage.setItem('token', newToken)
    setTokenInternal(newToken)
  }

  // return an array with the token and its public setter, like React's own useState does
  return [token, setToken]
}
