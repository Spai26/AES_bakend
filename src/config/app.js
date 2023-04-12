require("dotenv").config();
require("./database");
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const routes = require("../routes");
const server = express();

server.use(express.json());
server.use(express.static(path.resolve(__dirname, "./public")));

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Credentials", "false");
  next();
});

server.use(morgan("dev"));
server.use("/", routes);

module.exports = server;
