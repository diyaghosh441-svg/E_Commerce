import React, { createContext, useContext, useState } from "react"
import { authDataContext } from "./AuthContext"
import axios from "axios"

export const adminDataContext = createContext()

function AdminContext({ children }) {
    const [adminData, setAdminData] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { serverUrl } = useContext(authDataContext)

    const loginAdmin = async (token) => {
        setIsLoggedIn(true)
        setAdminData({ email: "admin@onecart.com", role: "admin", token })
    }

    const logoutAdmin = async () => {
        try {
            await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
        } catch (error) {
            console.log(error)
        }
        setIsLoggedIn(false)
        setAdminData(null)
    }

    const value = {
        adminData,
        isLoggedIn,
        loginAdmin,
        logoutAdmin
    }

    return (
        <adminDataContext.Provider value={value}>
            {children}
        </adminDataContext.Provider>
    )
}

export default AdminContext
