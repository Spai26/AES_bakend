const { Router } = require("express");
const getAllItems = require("../controller/Permission");
const { validateItem } = require("../validators/general");
const permissionRoute = Router();

permissionRoute.get("/", (res, req) => {
  res.send({ data: "here" });
});
module.exports = permissionRoute;
