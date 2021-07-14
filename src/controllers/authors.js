import { pool } from "../config/db.js"
import createError from "http-errors"

import { updateValues } from "../utils/queries.js"

export const getAllAuthors = async (req, res, next) => {
  const query = `
  SELECT * FROM authors
  ORDER BY created_at ASC
  `
  try {
    const { rows } = await pool.query(query)
    res.json(rows)
  } catch (error) {
    next(error)
  }
}
export const addNewAuthor = async (req, res, next) => {
  const { name, surname } = req.body
  const avatar = `https://eu.ui-avatars.com/api/?name=${name}+${surname}`
  const query = `
  INSERT INTO authors (name, surname, avatar)
  VALUES ('${name}', '${surname}', '${req.body.avatar || avatar}')
  RETURNING *
  `
  try {
    const { rows } = await pool.query(query)
    res.json(rows[0])
  } catch (error) {
    next(error)
  }
}
export const getSingleAuthor = async (req, res, next) => {
  const authorId = req.params.authorId
  const query = `
  SELECT * FROM authors
  WHERE id=${authorId}
  `
  try {
    const { rowCount, rows } = await pool.query(query)
    if (!rowCount) return next(createError(404, `Author with id ${authorId} not found`))
    res.json(rows[0])
  } catch (error) {
    if (error.code === "42703") res.status(400).json(error)
    else next(createError(500, error))
  }
}
export const deleteAuthor = async (req, res, next) => {
  const authorId = req.params.authorId
  const query = `
  DELETE FROM authors
  WHERE id=${authorId}
  RETURNING *
  `
  try {
    const { rowCount, rows } = await pool.query(query)
    if (!rowCount) return next(createError(404, `Author with id ${authorId} not found`))
    res.json({ message: "Author deleted successfully", author: rows[0] })
  } catch (error) {
    if (error.code === "42703") res.status(400).json(error)
    else next(createError(500, error))
  }
}
export const editAuthor = async (req, res, next) => {
  const authorId = req.params.authorId
  const valuesStr = updateValues(req.body)
  const query = `
  UPDATE authors
  SET ${valuesStr}
  WHERE id=${authorId}
  RETURNING *
  `
  try {
    const { rowCount, rows } = await pool.query(query)
    if (!rowCount) return next(createError(404, `Author with id ${authorId} not found`))
    res.json({ message: "Author updated successfully", author: rows[0] })
  } catch (error) {
    if (error.code === "42703") res.status(400).json(error)
    else next(createError(500, error))
  }
}
