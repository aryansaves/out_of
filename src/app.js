import dotenv from "dotenv"
import connectDB from "./config/db.js";
import express from "express"
import authrouter from "./routes/auth.routes.js";
import entryrouter from "./routes/entry.routes.js"
const app = express()
app.use(express.json())

dotenv.config()
connectDB();

app.use("/auth", authrouter)
app.use("/entries", entryrouter)

export default app