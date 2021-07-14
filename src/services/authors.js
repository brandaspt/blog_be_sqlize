import express from "express"

import * as Controllers from "../controllers/authors.js"

const router = express.Router()

router.route("/").get(Controllers.getAllAuthors).post(Controllers.addNewAuthor)
router.route("/:authorId").get(Controllers.getSingleAuthor).delete(Controllers.deleteAuthor).put(Controllers.editAuthor)

export default router
