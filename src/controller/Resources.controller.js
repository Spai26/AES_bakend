const { matchedData } = require("express-validator");
const { resources } = require("../models");
const showAllItems = (req, res) => {
  res.send({ data: "here" });
};

const uploadItems = (req, res) => {
  const { origin, url } = req.body;
  console.log(origin, url);
  res.send({ data: "upload" });
};

module.exports = {
  showAllItems,
  uploadItems,
};
