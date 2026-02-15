import dotenv from "dotenv"
import connectDB from "./config/db.js";
import express from "express"
import authrouter from "./routes/auth.routes.js";
import entryrouter from "./routes/entry.routes.js"
import profilerouter from "./routes/user.routes.js"
import watchlistrouter from "./routes/watchlist.routes.js"
const app = express()
app.use(express.json())

dotenv.config()
connectDB();

app.use("/auth", authrouter)
app.use("/entries", entryrouter)
app.use("/user", profilerouter)
app.use("/watchlist", watchlistrouter)
export default app