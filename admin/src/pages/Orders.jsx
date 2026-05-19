import React, { useContext, useEffect, useState } from 'react'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

function Orders() {
    let [orders, setOrders] = useState([])
    let { serverUrl } = useContext(authDataContext)

    const fetchAllOrders = async () => {
        try {
            const result = await axios.post(serverUrl + '/api/order/list', {}, { withCredentials: true })
            setOrders(result.data.reverse())
        } catch (error) {
            console.log(error)
        }
    }

    const statusHandler = async (e, orderId) => {
        try {
            await axios.post(serverUrl + '/api/order/status', { orderId, status: e.target.value }, { withCredentials: true })
            fetchAllOrders()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { fetchAllOrders() }, [])

    return (
        <div style={{ padding: "30px", color: "white", minHeight: "calc(100vh - 70px)" }}>
            <h1 style={{ fontSize: "28px", marginBottom: "30px" }}>All Orders</h1>
            {orders.map((order, index) => (
                <div key={index} style={{
                    display: "flex", alignItems: "center", gap: "20px",
                    padding: "15px", marginBottom: "15px", backgroundColor: "rgba(71, 85, 105, 0.5)",
                    borderRadius: "12px", flexWrap: "wrap"
                }}>
                    <div style={{ fontSize: "14px", color: "#56dbfc" }}>
                        {order.items.map((item, i) => (
                            <p key={i}>{item.name} x {item.quantity} ({item.size})</p>
                        ))}
                    </div>
                    <div style={{ fontSize: "14px" }}>
                        <p>{order.address.firstName} {order.address.lastName}</p>
                        <p>{order.address.street}, {order.address.city}, {order.address.state}</p>
                        <p>{order.address.pinCode}</p>
                        <p>{order.address.phone}</p>
                    </div>
                    <div style={{ fontSize: "14px" }}>
                        <p>Items: {order.items.length}</p>
                        <p>Method: {order.paymentMethod}</p>
                        <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                        <p style={{ fontSize: "18px", color: "white" }}>${order.amount}</p>
                    </div>
                    <select value={order.status} onChange={(e) => statusHandler(e, order._id)} style={{
                        padding: "8px", backgroundColor: "rgba(71, 85, 105, 0.8)", color: "white",
                        border: "1px solid #96eef3", borderRadius: "6px"
                    }}>
                        <option value="Order Placed">Order Placed</option>
                        <option value="Packing">Packing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for delivery">Out for delivery</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </div>
            ))}
        </div>
    )
}

export default Orders
