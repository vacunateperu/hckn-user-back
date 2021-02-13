const { Pool, Client } = require('pg')
const dotenv = require("dotenv");
dotenv.config({ path: '.env'})
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    ssl: process.env.SSL
  })
module.exports = pool