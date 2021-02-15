const { Pool, Client } = require('pg')
const dotenv = require("dotenv");
dotenv.config({ path: '.env'})
const pool = new Pool({
    host: `${process.env.PGHOST}`,
    database: `${process.env.PGDATABASE}`,
    port: process.env.PGPORT,
    user: `${process.env.PGUSER}`,
    password: `${process.env.PGPASSWORD}`
  })
module.exports = pool