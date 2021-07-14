import express from "express"

import * as Controllers from "../controllers/posts.js"

const router = express.Router()

router.route("/").get(Controllers.getAllPosts).post(Controllers.addNewPost)
router.route("/:postId").get(Controllers.getSinglePost).delete(Controllers.deletePost).put(Controllers.editPost)

export default router
