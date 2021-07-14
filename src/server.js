import express from "express"
import cors from "cors"

import authorsRouter from "./services/authors.js"
import postsRouter from "./services/posts.js"
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

// ERROR HANDLERS
server.use(errorHandler)

// Server and DB connection
sequelize
  .authenticate()
  .then(() => {
    server.listen(PORT, () => console.log("Server running and connected to DB. Listening on port " + PORT))
  })
  .catch(error => console.error("Unable to connect:", error))
