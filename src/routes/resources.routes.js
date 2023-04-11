const { Router } = require("express");
const isAuth = require("../middleware/session");
const resourcesRoute = Router();

resourcesRoute.get("/ ", (req, res) => {
  res.send({ data: "here" });
});
resourcesRoute.post("/upload", (req, res) => {
  res.send({ data: "upload" });
});
resourcesRoute.get("/:id", (req, res) => {
  res.send({ data: "here" });
});
resourcesRoute.put("/:id", (req, res) => {
  res.send({ data: "here" });
});
resourcesRoute.delete("/:id", (req, res) => {
  res.send({ data: "here" });
});

module.exports = resourcesRoute;
