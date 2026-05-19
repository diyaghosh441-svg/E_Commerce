import React, { useContext } from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Add from "./pages/Add"
import Lists from "./pages/Lists"
import Orders from "./pages/Orders"
import Login from "./pages/Login"
import { adminDataContext } from "./context/AdminContext"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import AdminLayout from "./component/AdminLayout"

function PublicRoute({ children }) {
  const { isLoggedIn } = useContext(adminDataContext)
  if (isLoggedIn) {
    return <Navigate to="/" replace />
  }
  return children
}

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/" element={<AdminLayout><Home /></AdminLayout>} />
        <Route path="/add" element={<AdminLayout><Add /></AdminLayout>} />
        <Route path="/lists" element={<AdminLayout><Lists /></AdminLayout>} />
        <Route path="/orders" element={<AdminLayout><Orders /></AdminLayout>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  )
}

export default App
