import React, { useContext, useState } from "react"
import logo from "../assets/logo.png"
import axios from "axios"
import { authDataContext } from "../context/AuthContext"
import { adminDataContext } from "../context/AdminContext"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

function Login() {
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let { serverUrl } = useContext(authDataContext)
  let { loginAdmin } = useContext(adminDataContext)
  let navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const AdminLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await axios.post(serverUrl + "/api/auth/adminlogin", { email, password }, { withCredentials: true })
      toast.success("Login Successful!")
      loginAdmin(result.data)
      navigate("/")
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Login Failed")
      setLoading(false)
    }
  }
  return (
    <div style={{ width: "100vw", height: "100vh", background: "linear-gradient(to right, #141414, #0c2025)", color: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start" }}>
       <div style={{ width: "100%", height: "80px", display: "flex", alignItems: "center", padding: "0 30px", gap: "10px" }}>
       <img style={{ width: "40px" }} src={logo} alt="" />
       <h1 style={{ fontSize: "22px", fontFamily: "sans-serif" }}>OneCart</h1>
       </div>
       <div style={{ width: "100%", height: "100px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "10px" }}>
           <span style={{ fontSize: "25px", fontWeight: "600" }}>Admin Login</span>
           <span style={{ fontSize: "16px" }}>Sign in to access the admin panel</span>
       </div>
       <div style={{ maxWidth: "600px", width: "90%", margin: "0 auto", backgroundColor: "rgba(0,0,0,0.15)", border: "1px solid rgba(150,150,150,0.2)", borderRadius: "12px", padding: "30px" }}>
           <form onSubmit={AdminLogin}>
               <input type="text" style={{ width: "100%", height: "50px", marginBottom: "15px", padding: "0 20px", color: "white", backgroundColor: "transparent", border: "2px solid rgba(150,150,150,0.2)", borderRadius: "8px" }} placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
               <input type="password" style={{ width: "100%", height: "50px", marginBottom: "15px", padding: "0 20px", color: "white", backgroundColor: "transparent", border: "2px solid rgba(150,150,150,0.2)", borderRadius: "8px" }} placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
               <button type="submit" disabled={loading} style={{ width: "100%", height: "50px", backgroundColor: loading ? "#6060f580" : "#6060f5", borderRadius: "8px", fontSize: "17px", fontWeight: "600", cursor: loading ? "not-allowed" : "pointer", border: "none", color: "white" }}>
                 {loading ? "Logging in..." : "Login"}
               </button>
           </form>
       </div>
    </div>
  )
}

export default Login
