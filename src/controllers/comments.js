import models from "../models/index.js"
import createError from "http-errors"
// import sequelize from "sequelize"

const { Comment } = models

export const addComment = async (req, res, next) => {
  try {
    const newComment = await Comment.create(req.body)
    res.json(newComment)
  } catch (error) {
    next(createError(400, error))
  }
}
export const getSingleComment = async (req, res, next) => {
  try {
  } catch (error) {}
}
export const deleteComment = async (req, res, next) => {
  try {
  } catch (error) {}
}
export const editComment = async (req, res, next) => {
  try {
  } catch (error) {}
}
