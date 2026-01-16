import express from "express"
const router = express.Router()

import mediacontroller from "../controllers/entry.controller.js"

import protect from "../middleware/auth.middleware.js"

router.use(protect)

router.post("/", mediacontroller.createEntry)
router.get("/", mediacontroller.getEntries)
router.get("/:id", mediacontroller.getEntryById)
router.put("/:id", mediacontroller.updateEntry)
router.delete("/:id", mediacontroller.deleteEntry)

export default router
