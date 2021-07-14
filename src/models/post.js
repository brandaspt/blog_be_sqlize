import { sequelize } from "../config/db.js"
import { Sequelize } from "sequelize"
import readingTime from "reading-time"
import striptags from "striptags"

const { DataTypes } = Sequelize

const Post = sequelize.define(
  "post",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    category: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    cover: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    read_time: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeValidate: (post, options) => {
        if (!post.cover)
          post.cover = `https://build-sunrise.s3.amazonaws.com/wp-content/uploads/2018/06/05130030/Book-Cover-placeholder-copy.jpg`
        post.read_time = readingTime(striptags(post.content)).text
      },
      beforeUpdate: (post, options) => {
        post.read_time = readingTime(striptags(post.content)).text
      },
    },
  }
)

export default Post
