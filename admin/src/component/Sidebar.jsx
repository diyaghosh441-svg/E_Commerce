import React from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    let navigate = useNavigate()
    return (
        <div style={{
            width: "240px",
            minHeight: "100vh",
            backgroundColor: "#1f2937",
            position: "fixed",
            left: 0,
            top: 0,
            paddingTop: "70px",
            zIndex: 997,
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid #374151"
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                paddingTop: "40px",
                paddingLeft: "16px",
                paddingRight: "16px"
            }}>
                <div 
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "12px 16px",
                        cursor: "pointer",
                        color: "white",
                        borderRadius: "8px",
                        backgroundColor: "transparent",
                        transition: "background-color 0.2s"
                    }}
                    onClick={() => navigate('/add')}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0891b2"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                    <IoIosAddCircleOutline style={{ width: "20px", height: "20px" }}/>
                    <span style={{ fontSize: "14px", fontWeight: "500" }}>Add Items</span>
                </div>
                <div 
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "12px 16px",
                        cursor: "pointer",
                        color: "white",
                        borderRadius: "8px",
                        backgroundColor: "transparent",
                        transition: "background-color 0.2s"
                    }}
                    onClick={() => navigate('/lists')}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0891b2"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                    <FaRegListAlt style={{ width: "20px", height: "20px" }}/>
                    <span style={{ fontSize: "14px", fontWeight: "500" }}>List Items</span>
                </div>
                <div 
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "12px 16px",
                        cursor: "pointer",
                        color: "white",
                        borderRadius: "8px",
                        backgroundColor: "transparent",
                        transition: "background-color 0.2s"
                    }}
                    onClick={() => navigate('/orders')}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0891b2"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                    <SiTicktick style={{ width: "20px", height: "20px" }}/>
                    <span style={{ fontSize: "14px", fontWeight: "500" }}>View Orders</span>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
