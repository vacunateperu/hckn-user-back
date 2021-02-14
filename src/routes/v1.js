const routes = require("express").Router()
const { query } = require("../controllers/query_CTRL")
routes.get("/query", query)
routes.post("/query", query)
module.exports = routes;