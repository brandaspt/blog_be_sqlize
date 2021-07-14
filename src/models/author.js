import { sequelize } from "../config/db.js"
import { Sequelize } from "sequelize"

const { DataTypes } = Sequelize

const Author = sequelize.define(
  "author",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    avatar: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeValidate: (author, options) => {
        if (!author.avatar) author.avatar = `https://eu.ui-avatars.com/api/?name=${author.name}+${author.surname}`
      },
      beforeUpdate: (author, options) => {
        console.log(author.name)
        if (author.avatar.includes(`https://eu.ui-avatars.com`)) {
          author.avatar = `https://eu.ui-avatars.com/api/?name=${author.name}+${author.surname}`
        }
      },
    },
  }
)

export default Author
