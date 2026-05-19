import React, { useContext, useEffect, useState } from 'react'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

function Home() {
    const [totalProducts, setTotalProducts] = useState(0)
    const [totalOrders, setTotalOrders] = useState(0)
    const { serverUrl } = useContext(authDataContext)

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const products = await axios.get(`${serverUrl}/api/product/list`, {}, { withCredentials: true })
                setTotalProducts(products.data.length)
                const orders = await axios.post(`${serverUrl}/api/order/list`, {}, { withCredentials: true })
                setTotalOrders(orders.data.length)
            } catch (err) {
                console.error("Failed to fetch counts", err)
            }
        }
        fetchCounts()
    }, [serverUrl])

    return (
        <div style={{
            padding: "30px",
            color: "white",
            minHeight: "calc(100vh - 70px)"
        }}>
            <h1 style={{
                fontSize: "35px",
                color: "#afe2f2",
                marginBottom: "40px"
            }}>OneCart Admin Panel</h1>
            
            <div style={{
                display: "flex",
                gap: "50px",
                flexWrap: "wrap"
            }}>
                <div style={{
                    color: "#dcfafd",
                    width: "400px",
                    maxWidth: "90%",
                    minHeight: "200px",
                    backgroundColor: "rgba(0,0,0,0.18)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "20px",
                    borderRadius: "12px",
                    fontSize: "25px",
                    border: "1px solid #969595",
                    padding: "20px"
                }}>
                    Total No. of Products: 
                    <span style={{
                        padding: "10px 20px",
                        backgroundColor: "#030e11",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid #969595"
                    }}>{totalProducts}</span>
                </div>
                <div style={{
                    color: "#dcfafd",
                    width: "400px",
                    maxWidth: "90%",
                    minHeight: "200px",
                    backgroundColor: "rgba(0,0,0,0.18)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "20px",
                    borderRadius: "12px",
                    fontSize: "25px",
                    border: "1px solid #969595",
                    padding: "20px"
                }}>
                    Total No. of Orders: 
                    <span style={{
                        padding: "10px 20px",
                        backgroundColor: "#030e11",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid #969595"
                    }}>{totalOrders}</span>
                </div>
            </div>
        </div>
    )
}

export default Home
