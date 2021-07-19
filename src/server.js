import express from "express"
import cors from "cors"

import authorsRouter from "./services/authors.js"
import postsRouter from "./services/posts.js"
import categoriesRouter from "./services/categories.js"
import commentsRouter from "./services/comments.js"
import { errorHandler } from "./errorHandlers.js"
import { sequelize } from "./config/db.js"

const server = express()
const PORT = process.env.PORT || 3001

// MIDDLEWARES
server.use(cors())
server.use(express.json())

// ENDPOINTS
server.use("/authors", authorsRouter)
server.use("/blogPosts", postsRouter)
server.use("/categories", categoriesRouter)
server.use("/comments", commentsRouter)

// ERROR HANDLERS
server.use(errorHandler)

// Server and DB connection
sequelize
  .sync({ alter: true })
  .then(() => {
    server.listen(PORT, () => console.log("Server running and listening on port " + PORT))
  })
  .catch(error => console.error("Unable to start server:", error))
