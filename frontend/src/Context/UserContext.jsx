import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { authDataContext } from './AuthContext'

export const userDataContext = createContext()

function UserContext({ children }) {
  const [userData, setUserData] = useState('')
  const { serverUrl } = useContext(authDataContext)

  const getCurrentUser = async () => {
    try {
      const result = await axios.get(serverUrl + '/api/user/getcurrentuser', {
        withCredentials: true,
      })
      setUserData(result.data)
    } catch {
      setUserData(null)
    }
  }

  useEffect(() => {
    getCurrentUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = { userData, setUserData, getCurrentUser }

  return <userDataContext.Provider value={value}>{children}</userDataContext.Provider>
}

export default UserContext

