const blogController = require("./blog.controller");
const searchBlog = require("./search.controller");
const handlerHttpError = require("../../utils/handlerHttpError");

/**
 *!TODO: funcion para buscar por titulo o traer todos la lista de blogs
 */
const SearchOrAllBlogs = async (req, res) => {
  const { search } = req.query;

  if (search) {
    console.log("search");
    try {
      const result = await searchBlog(search);

      return res.status(200).send(result);
    } catch (error) {
      handlerHttpError(res, "Este titulo no existe", 400);
    }
  }

  console.log("line");
  try {
    const result = await blogController.getAllBlogs();

    if (!result.length) {
      return handlerHttpError(res, "No hay Blogs creados !");
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    handlerHttpError(res, "ERR_LIST_CONTROLLER", 500);
  }
};

module.exports = SearchOrAllBlogs;
