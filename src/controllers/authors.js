import models from "../models/index.js"
import createError from "http-errors"

const { Author } = models

export const getAllAuthors = async (req, res, next) => {
  try {
    const authors = await Author.findAll()
    res.json(authors)
  } catch (error) {
    next(error)
  }
}
export const addNewAuthor = async (req, res, next) => {
  try {
    const newAuthor = await Author.create(req.body)
    res.json(newAuthor)
  } catch (error) {
    next(createError(400, error))
  }
}
export const getSingleAuthor = async (req, res, next) => {
  const authorId = req.params.authorId
  try {
    const foundAuthor = await Author.findByPk(parseInt(authorId))
    if (!foundAuthor) return next(createError(404, `Author with id ${authorId} not found`))
    res.json(foundAuthor)
  } catch (error) {
    next(createError(500, error))
  }
}
export const deleteAuthor = async (req, res, next) => {
  const authorId = req.params.authorId
  try {
    const resp = await Author.destroy({ where: { id: authorId } })
    if (!resp) return next(createError(404, `Author with id ${authorId} not found`))
    res.json({ ok: true, message: "Author deleted successfully." })
  } catch (error) {
    next(createError(500, error))
  }
}
export const editAuthor = async (req, res, next) => {
  const authorId = req.params.authorId
  try {
    const updatedAuthor = await Author.update(req.body, { where: { id: authorId }, returning: true, individualHooks: true })
    if (!updatedAuthor[0]) return next(createError(404, `Author with id ${authorId} not found`))
    res.json(updatedAuthor[1][0])
  } catch (error) {
    next(createError(500, error))
  }
}
