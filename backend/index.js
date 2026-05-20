import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import connectDb from "./config/db.js"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import corsOptions from "./config/corsConfig.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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

const adminDistPath = path.join(__dirname, "../admin/dist")
const frontendDistPath = path.join(__dirname, "../frontend/dist")

// Serve admin static assets under /admin
app.use("/admin", express.static(adminDistPath))

// SPA fallback for admin routes (use named parameter instead of wildcard)
app.get("/admin/:path(*)", (req, res) => {
  res.sendFile(path.join(adminDistPath, "index.html"))
})

// Also handle exact /admin route
app.get("/admin", (req, res) => {
  res.sendFile(path.join(adminDistPath, "index.html"))
})

// Serve frontend app at root
app.use(express.static(frontendDistPath))

// SPA fallback for frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"))
})

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}).catch(err => {
  console.error("Failed to connect to MongoDB:", err?.message || err)
  process.exit(1)
})