const { Router } = require("express");
const getAllItems = require("../controller/Role.controller");
const roleRoute = Router();

roleRoute.get("/", isAuth, checkrol(["admin"]), getAllItems);
module.exports = roleRoute;
