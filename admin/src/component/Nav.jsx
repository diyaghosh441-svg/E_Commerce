import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import logo from "../assets/logo.png"
import { adminDataContext } from "../context/AdminContext"
import { toast } from "react-toastify"

function Nav() {
    let navigate = useNavigate()
    let { logoutAdmin } = useContext(adminDataContext)

    const handleLogout = async () => {
        try {
            await logoutAdmin()
            toast.success("Logged Out Successfully")
            navigate("/login")
        } catch (error) {
            console.log(error)
            toast.error("Logout Failed")
        }
    }

  return (
    <div style={{ width: "100%", height: "70px", backgroundColor: "#dcdbdbf8", position: "fixed", top: 0, left: 0, right: 0, zIndex: 998, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 30px", boxShadow: "0 4px 6px rgba(0,0,0,0.5)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => navigate("/")}>
        <img src={logo} alt="" style={{ width: "30px", height: "30px" }}/>
        <h1 style={{ fontSize: "22px", color: "black", fontFamily: "sans-serif" }}>OneCart</h1>
        </div>
        <button 
          style={{ fontSize: "15px", padding: "10px 20px", cursor: "pointer", backgroundColor: "rgba(0,0,0,0.8)", borderRadius: "16px", color: "white", border: "none" }}
          onClick={handleLogout}
        >
          LogOut
        </button>
    </div>
  )
}

export default Nav
