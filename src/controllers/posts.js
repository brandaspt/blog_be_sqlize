import models from "../models/index.js"
import createError from "http-errors"

const { Post, Author, Category, Comment } = models

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: Author,
          attributes: ["id", "name", "surname"],
        },
        {
          model: Category,
          attributes: ["id", "name"],
        },
        {
          model: Comment,
          attributes: ["id", "authorName", "content"],
        },
      ],
    })
    res.json(posts)
  } catch (error) {
    next(createError(500, error))
  }
}

export const addNewPost = async (req, res, next) => {
  try {
    const newPost = await Post.create(req.body)
    res.json(newPost)
  } catch (error) {
    next(createError(400, error))
  }
}

export const getSinglePost = async (req, res, next) => {
  const postId = req.params.postId

  try {
    const foundPost = await Post.findByPk(postId, { include: Author })
    if (!foundPost) return next(createError(404, `Post with id ${postId} not found`))
    res.json(foundPost)
  } catch (error) {
    next(createError(500, error))
  }
}

export const deletePost = async (req, res, next) => {
  const postId = req.params.postId

  try {
    const resp = await Post.destroy({ where: { id: postId } })
    if (!resp) return next(createError(404, `Post with id ${postId} not found`))
    res.json({ message: "Post deleted successfully", ok: true })
  } catch (error) {
    next(createError(500, error))
  }
}

export const editPost = async (req, res, next) => {
  const postId = req.params.postId

  try {
    const updatedPost = await Post.update(req.body, { where: { id: postId }, returning: true, individualHooks: true })
    if (!updatedPost) return next(createError(404, `Post with id ${postId} not found`))
    res.json(updatedPost[1][0])
  } catch (error) {
    next(createError(500, error))
  }
}
