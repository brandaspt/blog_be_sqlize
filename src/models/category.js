import { sequelize } from "../config/db.js"
import { Sequelize } from "sequelize"

const { DataTypes } = Sequelize

const Category = sequelize.define(
  "categories",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  { freezeTableName: true }
)

export default Category
