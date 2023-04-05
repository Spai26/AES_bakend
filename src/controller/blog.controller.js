const { matchedData } = require("express-validator");
const { handlerHttpError } = require("../utils/handlerHttpError");
const { BlogTest } = require("../models/");
const uploadImage = require("../middleware/generateImage");

/**
 * obtener la lista de blogs
 * @param {*} req
 * @param {*} res
 */
const getItemsBlogs = async (req, res) => {
  const data = await BlogTest.find({});
  res.send({ data });
};

/**
 * !TODO: crear un blog en nuestro modelo
 * @param {*} req
 * @param {*} res
 * @return newBlog
 */
const createBlog = async (req, res) => {
  try {
    const {body} = req
    const bodyData = matchedData(body);

    
    res.send({ body, bodyData });
  } catch (error) {
    handlerHttpError(res, "ERROR_FN_CREATEBLOG");
  }
};
module.exports = { getItemsBlogs, createBlog };
