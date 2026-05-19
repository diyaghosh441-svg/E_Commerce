import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { adminDataContext } from '../context/AdminContext'
import AdminLayout from './AdminLayout'

function AdminRoute({ children }) {
  const { isLoggedIn } = useContext(adminDataContext)
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }
  
  return <AdminLayout>{children}</AdminLayout>
}

export default AdminRoute
