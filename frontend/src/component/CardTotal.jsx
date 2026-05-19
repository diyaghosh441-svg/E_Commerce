import React, { useContext } from 'react'
import { shopDataContext } from '../Context/shopContext'

function CartTotal() {
    const {currency , delivery_fee , getCartAmount} = useContext(shopDataContext)
  return (
    <div className="w-full mt-4">
      <div className="flex flex-col gap-2 text-sm">
       <div className="flex justify-between text-white text-base p-2">
          <p>Subtotal</p>
          <p>{currency} {getCartAmount()}.00</p>
        </div>
        <hr className="border-[#3b3b5c]"/>
         <div className="flex justify-between text-white text-base p-2">
          <p>Shipping Fee</p>
          <p>{currency} {delivery_fee}</p>
        </div>
        <hr className="border-[#3b3b5c]"/>
        <div className="flex justify-between text-white text-base p-2 font-semibold">
          <b>Total</b>
          <b>{currency} {getCartAmount()=== 0 ? 0 :getCartAmount() + delivery_fee}</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
