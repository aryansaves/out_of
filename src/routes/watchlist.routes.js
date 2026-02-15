import express from "express"
const router = express.Router()

import watchlistController from "../controllers/watchlist.controller.js"
import protect from "../middleware/auth.middleware.js"

router.use(protect)

router.post("/", watchlistController.addToWatchlist)
router.get("/", watchlistController.getWatchlist)
router.get("/check/:tmdbId", watchlistController.checkInWatchlist)
router.delete("/:tmdbId", watchlistController.removeFromWatchlist)

export default router
