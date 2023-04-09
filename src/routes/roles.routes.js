const { Router } = require("express");
const getAllItems = require("../controller/Role.controller");
const roleRoute = Router();

roleRoute.get("/", getAllItems);
module.exports = roleRoute;
