import express from "express"

import * as Controllers from "../controllers/categories.js"

const router = express.Router()

router.route("/").get(Controllers.getAllCategories).post(Controllers.addBulkCategories)
router.route("/:categoryId").get(Controllers.getSingleCategory).delete(Controllers.deleteCategory).put(Controllers.editCategory)

export default router
