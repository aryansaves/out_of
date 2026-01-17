import express from "express"

const router = express.Router()

import protect from "../middleware/auth.middleware.js"
import profile from "../controllers/user.controller.js"

router.get("/me/profile", protect, profile.getMyProfile)
router.get("/:username", profile.getPublicProfile)

export default router