import express from "express"
const router = express.Router()

import authController from "../controllers/auth.controller.js" 
import validatezod from "../middleware/validatazod.middleware.js"
import reglog from "../validation/auth.schema.js"

router.post("/register",validatezod(reglog.registerSchema), authController.register)
router.post("/login", validatezod(reglog.loginSchema), authController.login)

export default router