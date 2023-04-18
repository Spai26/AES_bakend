const { Router } = require("express");
const getAllItems = require("../controller/Role.controller");
const isAuth = require("../middleware/sessionAuth");
const checkrol = require("../middleware/roleAuth");
const roleRoute = Router();

roleRoute.get("/", isAuth, checkrol(["admin"]), getAllItems);
module.exports = roleRoute;
