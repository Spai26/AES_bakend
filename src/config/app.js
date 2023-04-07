require("dotenv").config();
require("./database");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const routes = require("../routes");
const server = express();

server.use(cors());
server.use(express.json());
server.use(express.static("storage"));
server.use(morgan("dev"));
server.use("/", routes);

module.exports = server;
