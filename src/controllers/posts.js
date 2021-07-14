import Post from "../models/post.js"
import createError from "http-errors"

export const getAllPosts = async (req, res, next) => {
  const query = `
  SELECT * FROM posts
  ORDER BY created_at ASC
  `
  try {
    const { rows } = await pool.query(query)
    res.json(rows)
  } catch (error) {
    next(error)
  }
}

export const addNewPost = async (req, res, next) => {
  const { category, title, author, content } = req.body
  const cover = `https://build-sunrise.s3.amazonaws.com/wp-content/uploads/2018/06/05130030/Book-Cover-placeholder-copy.jpg`
  const readTime = readingTime(striptags(content)).text
  const query = `
  INSERT INTO posts (category, title, cover, read_time, author, content)
  VALUES ('${category}', '${title}', '${req.body.cover || cover}', '${readTime}', '${author}', '${content}')
  RETURNING *
  `
  try {
    const { rows } = await pool.query(query)
    res.json(rows[0])
  } catch (error) {
    next(error)
  }
}

export const getSinglePost = async (req, res, next) => {
  const postId = req.params.postId
  const query = `
  SELECT * FROM posts
  WHERE id=${postId}
  `
  try {
    const { rowCount, rows } = await pool.query(query)
    if (!rowCount) return next(createError(404, `Post with id ${postId} not found`))
    res.json(rows[0])
  } catch (error) {
    if (error.code === "42703") res.status(400).json(error)
    else next(createError(500, error))
  }
}

export const deletePost = async (req, res, next) => {
  const postId = req.params.postId
  const query = `
  DELETE FROM posts
  WHERE id=${postId}
  RETURNING *
  `
  try {
    const { rowCount, rows } = await pool.query(query)
    if (!rowCount) return next(createError(404, `Post with id ${postId} not found`))
    res.json({ message: "Post deleted successfully", post: rows[0] })
  } catch (error) {
    if (error.code === "42703") res.status(400).json(error)
    else next(createError(500, error))
  }
}

export const editPost = async (req, res, next) => {
  const postId = req.params.postId
  let valuesStr = updateValues(req.body)
  if (req.body.content) {
    const readTime = readingTime(striptags(req.body.content)).text
    valuesStr += `, read_time='${readTime}'`
  }
  const query = `
  UPDATE posts
  SET ${valuesStr}
  WHERE id=${postId}
  RETURNING *
  `
  try {
    const { rowCount, rows } = await pool.query(query)
    if (!rowCount) return next(createError(404, `Post with id ${postId} not found`))
    res.json({ message: "Post updated successfully", post: rows[0] })
  } catch (error) {
    if (error.code === "42703") res.status(400).json(error)
    else next(createError(500, error))
  }
}
