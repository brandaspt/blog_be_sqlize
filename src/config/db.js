import pg from "pg"
import s from "sequelize"

// PG POOL
const { Pool } = pg

export const pool = new Pool()

// Sequelize
const { Sequelize } = s
const { PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT } = process.env

export const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  port: PGPORT,
  dialect: "postgres",
})
