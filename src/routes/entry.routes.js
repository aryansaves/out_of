import express from "express"
const router = express.Router()

import mediacontroller from "../controllers/entry.controller.js"
import validatezod from "../middleware/validatazod.middleware.js"
import zodschema from "../validation/mediaEntry.schema.js"
import protect from "../middleware/auth.middleware.js"

router.use(protect)

router.post("/", validatezod(zodschema.createEntrySchema), mediacontroller.createEntry)
router.get("/", mediacontroller.getEntries)
router.get("/:id", mediacontroller.getEntryById)
router.put("/:id",validatezod(zodschema.updateEntrySchema), mediacontroller.updateEntry)
router.delete("/:id", mediacontroller.deleteEntry)

export default router
