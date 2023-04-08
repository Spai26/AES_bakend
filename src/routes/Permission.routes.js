const { Router } = require("express");
const getAllItems = require("../controller/Permission");
const permissionRoute = Router();

permissionRoute.get("/", getAllItems);
module.exports = permissionRoute;
