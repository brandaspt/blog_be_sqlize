import models from "../models/index.js"
import createError from "http-errors"
import sequelize from "sequelize"

const { Category, Post } = models

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      // attributes: ["id", "name", "post.id", [sequelize.fn("count", "post.id"), "total"]],
      // attributes: ["categories.id", "name", [sequelize.fn("count", sequelize.col("posts", "id")), "totalPosts"]],
      include: {
        model: Post,
        attributes: ["id", "title", "authorId"],
        separate: true, // Required to order posts
        order: ["title"], // Ordering posts by title
      },
      // group: ["categories.id"],
      order: ["id"], // Ordering categories by id
      // raw: true,
    })
    res.json(categories)
  } catch (error) {
    next(createError(500, error))
  }
}
export const addBulkCategories = async (req, res, next) => {
  try {
    const newCategories = await Category.bulkCreate(req.body)
    res.json(newCategories)
  } catch (error) {
    res.status(400).json(error)
  }
}
export const getSingleCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId
  try {
    const category = await Category.findByPk(categoryId, { include: { model: Post, attributes: ["id", "title", "authorId"] } })
    if (!category) return next(createError(404, `Category with id ${categoryId} not found`))
    res.json(category)
  } catch (error) {
    next(createError(500, error))
  }
}
export const deleteCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId
  try {
    const rowCount = Category.destroy({ where: { id: categoryId } })
    if (!rowCount) return next(createError(404, `Category with id ${categoryId} not found`))
    res.json({ ok: true, message: "Category deleted successfully." })
  } catch (error) {
    next(createError(500, error))
  }
}
export const editCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId
  try {
    const updatedCategory = await Category.update(req.body, { where: { id: categoryId }, returning: true })
    res.json(updatedCategory)
  } catch (error) {
    res.status(400).json(error)
  }
}
