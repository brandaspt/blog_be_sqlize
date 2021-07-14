import Post from "./post.js"
import Author from "./author.js"

const models = { Post, Author }

models.Author.hasMany(models.Post, { foreignKey: { allowNull: false } })
models.Post.belongsTo(models.Author, { foreignKey: { allowNull: false } })

export default models
