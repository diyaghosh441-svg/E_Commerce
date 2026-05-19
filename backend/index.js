import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import connectDb from "./config/db.js"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import corsOptions from "./config/corsConfig.js"

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" })
})

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)

connectDb().catch(err => {
  console.error("Failed to connect to MongoDB:", err?.message || err)
})
