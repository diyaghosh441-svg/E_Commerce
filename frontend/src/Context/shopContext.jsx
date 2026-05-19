import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { authDataContext } from './AuthContext'
import { userDataContext } from './UserContext'
import { toast } from 'react-toastify'

export const shopDataContext = createContext()

function ShopContext({ children }) {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const { userData } = useContext(userDataContext)
  const [showSearch, setShowSearch] = useState(false)
  const { serverUrl } = useContext(authDataContext)
  const [cartItem, setCartItem] = useState({})
  const [loading, setLoading] = useState(false)

  const currency = 'Rs.'
  const delivery_fee = 40

  const getProducts = async () => {
    try {
      const result = await axios.get(serverUrl + '/api/product/list')
      setProducts(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const addtoCart = async (itemId, size) => {
    if (!size) {
      console.log('Select Product Size')
      return
    }

    const cartData = structuredClone(cartItem)

    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1
    } else {
      cartData[itemId] = {}
      cartData[itemId][size] = 1
    }

    setCartItem(cartData)

    if (userData) {
      setLoading(true)
      try {
        await axios.post(serverUrl + '/api/cart/add', { itemId, size }, { withCredentials: true })
        toast.success('Product Added')
      } catch (error) {
        console.log(error)
        toast.error('Add Cart Error')
      } finally {
        setLoading(false)
      }
    }
  }

  const getUserCart = async () => {
    if (!userData) return;
    try {
      const result = await axios.post(serverUrl + '/api/cart/get', {}, { withCredentials: true })
      setCartItem(result.data || {})
    } catch (error) {
      console.log(error)
    }
  }

  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItem)
    cartData[itemId][size] = quantity
    setCartItem(cartData)

    if (userData) {
      try {
        await axios.post(
          serverUrl + '/api/cart/update',
          { itemId, size, quantity },
          { withCredentials: true }
        )
      } catch (error) {
        console.log(error)
      }
    }
  }

  const getCartCount = () => {
    let totalCount = 0
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          totalCount += cartItem[items][item]
        }
      }
    }
    return totalCount
  }

  const getCartAmount = () => {
    let totalAmount = 0
    for (const items in cartItem) {
      const itemInfo = products.find((product) => product._id === items)
      if (!itemInfo) continue

      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          totalAmount += itemInfo.price * cartItem[items][item]
        }
      }
    }
    return totalAmount
  }

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    if (userData) {
      getUserCart()
    }
  }, [userData])

  const value = {
    products,
    currency,
    delivery_fee,
    getProducts,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    addtoCart,
    getCartCount,
    setCartItem,
    updateQuantity,
    getCartAmount,
    loading,
  }

  return <shopDataContext.Provider value={value}>{children}</shopDataContext.Provider>
}

export default ShopContext