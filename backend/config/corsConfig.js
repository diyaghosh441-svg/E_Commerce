const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
  "http://localhost:5177",
  "http://localhost:5178",
  "http://localhost:5179",
  "http://localhost:5183",
  "http://localhost:5184",
  "http://localhost:5185",
  "http://localhost:5186",
  "http://localhost:5187",
  "http://localhost:5188",
  "http://localhost:5189",
  "http://localhost:5190",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "http://127.0.0.1:5175",
  "http://127.0.0.1:5176",
  "http://127.0.0.1:5177",
  "http://127.0.0.1:5178",
  "http://127.0.0.1:5179",
  "http://127.0.0.1:5183",
  "http://127.0.0.1:5184",
  "http://127.0.0.1:5185",
  "http://127.0.0.1:5186",
  "http://127.0.0.1:5187",
  "http://127.0.0.1:5188",
  "http://127.0.0.1:5189",
  "http://127.0.0.1:5190",
  process.env.FRONTEND_URL
].filter(Boolean)

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || (origin && origin.includes(".onrender.com"))) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true
}

export default corsOptions