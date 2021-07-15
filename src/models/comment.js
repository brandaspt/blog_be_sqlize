import { sequelize } from "../config/db.js"
import { Sequelize } from "sequelize"

const { DataTypes } = Sequelize

const Comment = sequelize.define("comment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  authorName: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
})

export default Comment
