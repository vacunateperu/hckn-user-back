const routes = require("express").Router()
const { query, identity } = require("../controllers/query_CTRL")
routes.get("/query", query)
routes.post("/query", query)
routes.post("/identity", identity)
module.exports = routes;