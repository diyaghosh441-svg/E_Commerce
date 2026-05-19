import React, { useState, useContext } from 'react'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'
import upload from '../assets/upload image.jpg'

function Add() {
    let [image1, setImage1] = useState(false)
    let [image2, setImage2] = useState(false)
    let [image3, setImage3] = useState(false)
    let [image4, setImage4] = useState(false)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("Men")
    const [price, setPrice] = useState("")
    const [subCategory, setSubCategory] = useState("TopWear")
    const [bestseller, setBestSeller] = useState(false)
    const [sizes, setSizes] = useState([])
    const [loading, setLoading] = useState(false)
    let { serverUrl } = useContext(authDataContext)

    const handleAddProduct = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            let formData = new FormData()
            formData.append("name", name)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("category", category)
            formData.append("subCategory", subCategory)
            formData.append("bestseller", bestseller)
            formData.append("sizes", JSON.stringify(sizes))
            formData.append("image1", image1)
            formData.append("image2", image2)
            formData.append("image3", image3)
            formData.append("image4", image4)
            await axios.post(serverUrl + "/api/product/addproduct", formData, { withCredentials: true })
            toast.success("Product Added Successfully")
            setLoading(false)
            setName(""); setDescription(""); setImage1(false); setImage2(false); setImage3(false); setImage4(false)
            setPrice(""); setBestSeller(false); setCategory("Men"); setSubCategory("TopWear")
        } catch (error) {
            toast.error("Add Product Failed")
            setLoading(false)
        }
    }

    const toggleSize = (size) => {
        setSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])
    }

    return (
        <div style={{ padding: "30px", color: "white", minHeight: "calc(100vh - 70px)" }}>
            <h1 style={{ fontSize: "28px", marginBottom: "30px" }}>Add Product</h1>
            <form onSubmit={handleAddProduct} style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "600px" }}>
                <div>
                    <p style={{ marginBottom: "10px" }}>Upload Images</p>
                    <div style={{ display: "flex", gap: "15px" }}>
                        {[image1, image2, image3, image4].map((img, i) => (
                            <label key={i} style={{ width: "100px", height: "100px", cursor: "pointer", display: "block" }}>
                                <img src={!img ? upload : URL.createObjectURL(img)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }} />
                                <input type="file" hidden onChange={(e) => {
                                    const setter = [setImage1, setImage2, setImage3, setImage4][i]
                                    setter(e.target.files[0])
                                }} required />
                            </label>
                        ))}
                    </div>
                </div>
                <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required
                    style={{ padding: "12px", borderRadius: "8px", border: "1px solid #374151", backgroundColor: "transparent", color: "white" }} />
                <textarea placeholder="Product Description" value={description} onChange={(e) => setDescription(e.target.value)} required
                    style={{ padding: "12px", borderRadius: "8px", border: "1px solid #374151", backgroundColor: "transparent", color: "white", minHeight: "100px" }} />
                <div style={{ display: "flex", gap: "20px" }}>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: "12px", borderRadius: "8px", backgroundColor: "transparent", color: "white", border: "1px solid #374151" }}>
                        <option value="Men">Men</option><option value="Women">Women</option><option value="Kids">Kids</option>
                    </select>
                    <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} style={{ padding: "12px", borderRadius: "8px", backgroundColor: "transparent", color: "white", border: "1px solid #374151" }}>
                        <option value="TopWear">TopWear</option><option value="BottomWear">BottomWear</option><option value="WinterWear">WinterWear</option>
                    </select>
                </div>
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required
                    style={{ padding: "12px", borderRadius: "8px", border: "1px solid #374151", backgroundColor: "transparent", color: "white" }} />
                <div>
                    <p style={{ marginBottom: "10px" }}>Sizes</p>
                    <div style={{ display: "flex", gap: "10px" }}>
                        {["S", "M", "L", "XL", "XXL"].map(size => (
                            <div key={size} onClick={() => toggleSize(size)} style={{
                                padding: "8px 16px", borderRadius: "8px", cursor: "pointer",
                                backgroundColor: sizes.includes(size) ? "#059669" : "#374151",
                                color: sizes.includes(size) ? "black" : "white"
                            }}>{size}</div>
                        ))}
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <input type="checkbox" id="bestseller" checked={bestseller} onChange={() => setBestSeller(!bestseller)} />
                    <label htmlFor="bestseller">Add to BestSeller</label>
                </div>
                <button type="submit" disabled={loading} style={{
                    padding: "15px 30px", backgroundColor: "#0891b2", borderRadius: "8px",
                    color: "black", fontWeight: "600", cursor: loading ? "not-allowed" : "pointer", border: "none"
                }}>
                    {loading ? <Loading /> : "Add Product"}
                </button>
            </form>
        </div>
    )
}

export default Add
