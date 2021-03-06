const routes = require("express").Router()
const { query, identity } = require("../controllers/query_CTRL")
routes.get("/query", query)
routes.post("/query", query)
routes.get("/identity", identity)
module.exports = routes;