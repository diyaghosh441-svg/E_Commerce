import React from 'react'
import Nav from './Nav'
import Sidebar from './Sidebar'

function AdminLayout({ children }) {
    return (
        <div style={{
            width: "100vw",
            minHeight: "100vh",
            backgroundColor: "#141414",
            position: "relative"
        }}>
            <Nav />
            <Sidebar />
            <div style={{
                marginLeft: "240px",
                paddingTop: "70px",
                minHeight: "100vh",
                boxSizing: "border-box"
            }}>
                {children}
            </div>
        </div>
    )
}

export default AdminLayout
