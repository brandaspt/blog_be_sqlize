import Post from "./post.js"
import Author from "./author.js"
import Comment from "./comment.js"
import Category from "./category.js"

const models = { Post, Author, Comment, Category }

models.Author.hasMany(models.Post, { foreignKey: { allowNull: false } })
models.Post.belongsTo(models.Author, { foreignKey: { allowNull: false } })

models.Post.hasMany(models.Comment, { foreignKey: { allowNull: false } })
models.Comment.belongsTo(models.Post, { foreignKey: { allowNull: false } })

models.Category.hasMany(models.Post, { foreignKey: { allowNull: false } })
models.Post.belongsTo(models.Category, { foreignKey: { allowNull: false } })

export default models
