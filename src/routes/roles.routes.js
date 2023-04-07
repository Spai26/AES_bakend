const { Router } = require("express");
const getAllItems = require("../controller/Role");
const roleRoute = Router();

roleRoute.get("/", getAllItems);
module.exports = roleRoute;
