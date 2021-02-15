const { Pool, Client } = require('pg')
const dotenv = require("dotenv");
dotenv.config({ path: '.env'})
console.log(process.env.PGHOST)
console.log(process.env.PGDATABASE)
console.log(process.env.PGPORT)
console.log(process.env.PGUSER)
console.log(process.env.PGPASSWORD)
console.log(process.env.SSL)
const pool = new Pool({
    host: `${process.env.PGHOST}`,
    database: `${process.env.PGDATABASE}`,
    port: process.env.PGPORT,
    user: `${process.env.PGUSER}`,
    password: `${process.env.PGPASSWORD}`
  })
module.exports = pool