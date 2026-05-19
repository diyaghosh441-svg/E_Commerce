import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import razorpayImg from '../assets/Razorpay.jpg'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'

function PlaceOrder() {
    const [method, setMethod] = useState('cod')
    const navigate = useNavigate()
    const { cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(shopDataContext)
    const { serverUrl } = useContext(authDataContext)
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', street: '', city: '', state: '', pinCode: '', country: '', phone: ''
    })

    const onChangeHandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormData(data => ({ ...data, [name]: value }))
    }

    const initPay = (order) => {
        console.log('Opening Razorpay for order:', order.id)
        
        if (typeof window !== 'undefined' && window.Razorpay) {
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || '',
                amount: order.amount,
                currency: order.currency || 'INR',
                name: 'OneCart',
                description: 'Order Payment',
                order_id: order.id,
                receipt: order.receipt,
                prefill: {
                    name: (formData.firstName + ' ' + formData.lastName).trim() || '',
                    email: formData.email || '',
                    contact: formData.phone || ''
                },
                theme: {
                    color: '#3bcee8'
                }
            }
            
            const rzp = new window.Razorpay(options)
            
            rzp.on('payment.failed', (response) => {
                console.error('Payment failed:', response.error)
                toast.error('Payment failed: ' + (response.error?.description || 'Unknown error'))
                setLoading(false)
            })
            
            rzp.open()
        } else {
            toast.error('Razorpay not loaded. Please refresh the page.')
            setLoading(false)
        }
    }

    const handlePlaceOrder = async (e) => {
        if (e) e.preventDefault()
        if (loading) return
        setLoading(true)
        
        try {
            const orderItems = []
            for (const itemId in cartItem) {
                for (const size in cartItem[itemId]) {
                    if (cartItem[itemId][size] > 0) {
                        const product = products.find(p => p._id === itemId)
                        if (product) {
                            orderItems.push({
                                ...structuredClone(product),
                                size: size,
                                quantity: cartItem[itemId][size]
                            })
                        }
                    }
                }
            }

            if (orderItems.length === 0) {
                toast.error('Your cart is empty')
                setLoading(false)
                return
            }

            const orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }

            if (method === 'cod') {
                const result = await axios.post(serverUrl + '/api/order/placeorder', orderData, { withCredentials: true })
                if (result.data) {
                    toast.success('Order Placed Successfully!')
                    setCartItem({})
                    navigate('/order')
                } else {
                    toast.error('Failed to place order')
                }
            } else if (method === 'razorpay') {
                const razorpayResult = await axios.post(serverUrl + '/api/order/razorpay', orderData, { withCredentials: true })
                console.log('Razorpay order created:', razorpayResult.data)
                if (razorpayResult.data && razorpayResult.data.id) {
                    initPay(razorpayResult.data)
                } else {
                    toast.error('Failed to create Razorpay order')
                    setLoading(false)
                }
            }
        } catch (error) {
            console.error('Order error:', error)
            toast.error(error.response?.data?.message || 'Something went wrong')
        } finally {
            if (method === 'cod') setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] py-16 md:py-20">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Checkout</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    <div className="bg-[#1a1a2e]/80 p-6 md:p-8 rounded-xl shadow-md border border-[#80808049] space-y-5">
                        <Title text1={"DELIVERY"} text2={"INFORMATION"}/>
                        <form onSubmit={handlePlaceOrder} className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input type="text" placeholder="First Name" className="w-full h-[50px] rounded-lg bg-slate-700 placeholder:text-gray-400 text-white text-base px-5 border border-[#3b3b5c] focus:border-[#3bcee8] outline-none transition-colors" required onChange={onChangeHandler} name="firstName" value={formData.firstName}/>
                                <input type="text" placeholder="Last Name" className="w-full h-[50px] rounded-lg bg-slate-700 placeholder:text-gray-400 text-white text-base px-5 border border-[#3b3b5c] focus:border-[#3bcee8] outline-none transition-colors" required onChange={onChangeHandler} name="lastName" value={formData.lastName}/>
                            </div>
                            <input type="email" placeholder="Email Address" className="w-full h-[50px] rounded-lg bg-slate-700 placeholder:text-gray-400 text-white text-base px-5 border border-[#3b3b5c] focus:border-[#3bcee8] outline-none transition-colors" required onChange={onChangeHandler} name="email" value={formData.email}/>
                            <input type="text" placeholder="Street Address" className="w-full h-[50px] rounded-lg bg-slate-700 placeholder:text-gray-400 text-white text-base px-5 border border-[#3b3b5c] focus:border-[#3bcee8] outline-none transition-colors" required onChange={onChangeHandler} name="street" value={formData.street}/>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input type="text" placeholder="City" className="w-full h-[50px] rounded-lg bg-slate-700 placeholder:text-gray-400 text-white text-base px-5 border border-[#3b3b5c] focus:border-[#3bcee8] outline-none transition-colors" required onChange={onChangeHandler} name="city" value={formData.city}/>
                                <input type="text" placeholder="State" className="w-full h-[50px] rounded-lg bg-slate-700 placeholder:text-gray-400 text-white text-base px-5 border border-[#3b3b5c] focus:border-[#3bcee8] outline-none transition-colors" required onChange={onChangeHandler} name="state" value={formData.state}/>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input type="text" placeholder="Pincode" className="w-full h-[50px] rounded-lg bg-slate-700 placeholder:text-gray-400 text-white text-base px-5 border border-[#3b3b5c] focus:border-[#3bcee8] outline-none transition-colors" required onChange={onChangeHandler} name="pinCode" value={formData.pinCode}/>
                                <input type="text" placeholder="Country" className="w-full h-[50px] rounded-lg bg-slate-700 placeholder:text-gray-400 text-white text-base px-5 border border-[#3b3b5c] focus:border-[#3bcee8] outline-none transition-colors" required onChange={onChangeHandler} name="country" value={formData.country}/>
                            </div>
                            <input type="tel" placeholder="Phone Number" className="w-full h-[50px] rounded-lg bg-slate-700 placeholder:text-gray-400 text-white text-base px-5 border border-[#3b3b5c] focus:border-[#3bcee8] outline-none transition-colors" required onChange={onChangeHandler} name="phone" value={formData.phone}/>
                        </form>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="bg-[#1a1a2e]/80 p-6 md:p-8 rounded-xl shadow-md border border-[#80808049]">
                            <Title text1={"CART"} text2={"TOTALS"}/>
                            <CartTotal/>
                        </div>

                        <div className="bg-[#1a1a2e]/80 p-6 md:p-8 rounded-xl shadow-md border border-[#80808049] space-y-5">
                            <Title text1={"PAYMENT"} text2={"METHOD"}/>
                            <div className="flex flex-col gap-4">
                                <button type="button" onClick={() => setMethod('razorpay')} className={`flex items-center justify-between border-2 rounded-xl p-5 cursor-pointer transition-all text-left ${method === 'razorpay' ? 'border-[#3bcee8] bg-[#3bcee810]' : 'border-[#3b3b5c] hover:border-[#3bcee8]/50'}`}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-20 h-10 flex items-center justify-center bg-white rounded-lg">
                                            <img src={razorpayImg} className="w-full h-full object-contain rounded" alt="Razorpay" />
                                        </div>
                                        <div>
                                            <span className="text-white text-base font-medium block">Pay with Razorpay</span>
                                            <span className="text-gray-400 text-sm">Cards, UPI, NetBanking, Wallet</span>
                                        </div>
                                    </div>
                                    {method === 'razorpay' && <svg className="w-6 h-6 text-[#3bcee8] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                                </button>

                                <button type="button" onClick={() => setMethod('cod')} className={`flex items-center justify-between border-2 rounded-xl p-5 cursor-pointer transition-all text-left ${method === 'cod' ? 'border-[#3bcee8] bg-[#3bcee810]' : 'border-[#3b3b5c] hover:border-[#3bcee8]/50'}`}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-20 h-10 bg-gradient-to-r from-[#95b3f8] to-white rounded-lg flex items-center justify-center">
                                            <span className="text-[#332f6f] font-bold text-sm">COD</span>
                                        </div>
                                        <div>
                                            <span className="text-white text-base font-medium block">Cash on Delivery</span>
                                            <span className="text-gray-400 text-sm">Pay when you receive</span>
                                        </div>
                                    </div>
                                    {method === 'cod' && <svg className="w-6 h-6 text-[#3bcee8] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                                </button>
                            </div>

                            <button type="button" onClick={handlePlaceOrder} disabled={loading} className="w-full text-base active:bg-slate-500 cursor-pointer bg-[#3bcee848] py-4 px-8 rounded-xl text-white flex items-center justify-center gap-2 border border-[#80808049] disabled:opacity-60 hover:bg-[#3bcee860] transition-all">
                                {loading ? <Loading/> : 'PLACE ORDER'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrder
