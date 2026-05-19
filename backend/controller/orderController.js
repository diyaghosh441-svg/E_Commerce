import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import razorpay from 'razorpay'
import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config()

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

export const placeOrder = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const userId = req.userId;
        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }
        const newOrder = new Order(orderData)
        await newOrder.save()
        await User.findByIdAndUpdate(userId, { cartData: {} })
        return res.status(201).json({ message: "Order Placed" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Order Place error" })
    }
}

export const placeOrderRazorpay = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const userId = req.userId;

        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()
        }
        const newOrder = new Order(orderData)
        await newOrder.save()

        const options = {
            amount: Math.round(amount * 100),
            currency: "INR",
            receipt: newOrder._id.toString(),
            notes: { userId: userId }
        }

        const order = await razorpayInstance.orders.create(options)
        console.log("Razorpay order created:", order)
        res.status(200).json(order)
    } catch (error) {
        console.log("Razorpay order error:", error)
        res.status(500).json({ message: error.message || "Failed to create order" })
    }
}

export const verifyRazorpay = async (req, res) => {
    try {
        const userId = req.userId
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

        console.log("=== VERIFICATION START ===")
        console.log("Order ID:", razorpay_order_id)
        console.log("Payment ID:", razorpay_payment_id)
        console.log("Has Secret:", !!process.env.RAZORPAY_KEY_SECRET)

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex")

        console.log("Expected:", expectedSignature)
        console.log("Received:", razorpay_signature)
        console.log("Match:", expectedSignature === razorpay_signature)

        if (expectedSignature !== razorpay_signature) {
            console.log("SIGNATURE FAILED!")
            return res.status(400).json({ message: "Invalid signature" })
        }

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        console.log("Razorpay status:", orderInfo.status)

        if (orderInfo.status === "paid") {
            await Order.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            await User.findByIdAndUpdate(userId, { cartData: {} })
            console.log("=== VERIFIED SUCCESS ===")
            res.status(200).json({ message: "Payment Successful" })
        } else {
            res.status(400).json({ message: "Payment not completed" })
        }
    } catch (error) {
        console.log("Verification error:", error)
        res.status(500).json({ message: error.message })
    }
}

export const userOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await Order.find({ userId }).sort({ date: -1 })
        return res.status(200).json(orders)
    } catch (error) {
        return res.status(500).json({ message: "userOrders error" })
    }
}

export const allOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ date: -1 })
        res.status(200).json(orders)
    } catch (error) {
        return res.status(500).json({ message: "adminAllOrders error" })
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await Order.findByIdAndUpdate(orderId, { status })
        return res.status(201).json({ message: "Status Updated" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
