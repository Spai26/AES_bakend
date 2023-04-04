const blogController = require("../../controllers/Blog/blog.controllers");
const searchBlog = require("../../controllers/Blog/search.controller");

const SearchOrAllBlogs = async (req, res, next) => {
  const { search } = req.query;
  const user = req.user;
  if (search) {
    console.log("entramos en busqueda");
    try {
      const result = await searchBlog(search);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  console.log("entrada directa");
  console.log(user);
  try {
    const result = await blogController.getallBlogs();
    
    result
      ? res.status(200).json(result)
      : res.status(400).json({ success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = SearchOrAllBlogs;
