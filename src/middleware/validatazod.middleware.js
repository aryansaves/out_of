import { success } from "zod"

const validatezod = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body)

    if(!result.success) {
        return res.status(400).json({
            result: success,
            message : "Validation failed",
            errors : result.error.issues.map((i) => ({
                path: i.path.join("."),
                message: i.message
            }))
        })
    }

    req.body = result.data
    next()
}

export default validatezod