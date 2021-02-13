const express = require("express");
const morgan =  require("morgan");
const cors =  require("cors");
const compression = require("compression");
const dotenv = require("dotenv");
dotenv.config({ path: '.env'})
const server = express();
const routes = require("./routes/v1")
server.use(morgan("combined"))
server.use(express.urlencoded({extended: true}))
server.use(express.json())
server.use(cors("*"))
server.use(compression({}))
server.use("", routes)
server.use("/api", routes)
server.use(express.static("public"))
server.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({error: {status: err.status || 500,message: err.message}})
})
server.listen(process.env.PORT, () => {
  console.log(`app running on port ${process.env.PORT}`)
})
