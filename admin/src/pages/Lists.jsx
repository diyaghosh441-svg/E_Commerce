import React, { useContext, useEffect, useState } from 'react'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

function Lists() {
    let [list, setList] = useState([])
    let { serverUrl } = useContext(authDataContext)

    const fetchList = async () => {
        try {
            let result = await axios.get(serverUrl + "/api/product/list", { withCredentials: true })
            setList(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const removeList = async (id) => {
        try {
            await axios.post(serverUrl + `/api/product/remove/${id}`, {}, { withCredentials: true })
            fetchList()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { fetchList() }, [])

    return (
        <div style={{ padding: "30px", color: "white", minHeight: "calc(100vh - 70px)" }}>
            <h1 style={{ fontSize: "28px", marginBottom: "30px" }}>All Products</h1>
            {list.length > 0 ? (
                list.map((item, index) => (
                    <div key={index} style={{
                        display: "flex", alignItems: "center", gap: "20px",
                        padding: "15px", marginBottom: "15px", backgroundColor: "rgba(71, 85, 105, 0.5)",
                        borderRadius: "12px"
                    }}>
                        <img src={item.image1} alt={item.name} style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }} />
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: "18px", color: "#bef0f3" }}>{item.name}</div>
                            <div style={{ fontSize: "15px", color: "#bef3da" }}>{item.category}</div>
                            <div style={{ fontSize: "15px", color: "#bef3da" }}>${item.price}</div>
                        </div>
                        <button onClick={() => removeList(item._id)} style={{
                            padding: "8px 16px", backgroundColor: "#dc2626", color: "white",
                            border: "none", borderRadius: "6px", cursor: "pointer"
                        }}>Delete</button>
                    </div>
                ))
            ) : (
                <div style={{ fontSize: "18px", opacity: 0.7 }}>No products available</div>
            )}
        </div>
    )
}

export default Lists
