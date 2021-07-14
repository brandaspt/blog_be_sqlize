import sequelize from "../config/db.js"
import { DataTypes } from "sequelize"

const Author = sequelize.define("Author", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
})
