import express from "express"

import * as Controllers from "../controllers/comments.js"

const router = express.Router()

router.route("/").post(Controllers.addComment)
router.route("/:categoryId").get(Controllers.getSingleComment).delete(Controllers.deleteComment).put(Controllers.editComment)

export default router
