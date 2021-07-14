import Post from "./post.js"
import Author from "./author.js"

const models = { Post, Author }

models.Author.hasMany(Post)

export default models
