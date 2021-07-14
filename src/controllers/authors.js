import models from "../models/index.js"
import createError from "http-errors"
import sequelize from "sequelize"

const { Op } = sequelize

const { Author, Post } = models

export const getAllAuthors = async (req, res, next) => {
  // const keys = Object.keys(req.query)
  // const query = {}
  // keys.forEach(key => {
  //   if (["name", "surname"].includes(key)) {
  //     query[Op.or]
  //       ? query[Op.or].push({ [key]: { [Op.substring]: req.query[key] } })
  //       : (query[Op.or] = [{ [key]: { [Op.substring]: req.query[key] } }])
  //   }
  // })

  try {
    const authors = await Author.findAll({
      // include: Post,
      where: req.query.name
        ? {
            [Op.or]: [
              {
                name: {
                  [Op.iLike]: `%${req.query.name}%`,
                },
              },
              {
                surname: {
                  [Op.iLike]: `%${req.query.name}%`,
                },
              },
            ],
          }
        : {},
    })
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
