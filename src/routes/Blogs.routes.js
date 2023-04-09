const { Router } = require("express");
const SearchOrAllBlogs = require("../controller/blog/blog.index");
const blogController = require("../controller/blog/blog.controller");
const catWithinBlog = require("../controller/blog/catInBlog");
const { validateNewBlog, validateUpdate } = require("../validators/Blog");
const { validateItem } = require("../validators/general");
const isAuth = require("../middleware/session");
const blogRoute = Router();

blogRoute.get("/", SearchOrAllBlogs);
blogRoute.post("/", validateNewBlog, blogController.setCreateBlog);
blogRoute.get("/:id", validateItem, blogController.getDetailBlog);
blogRoute.put(
  "/:id",
  isAuth,
  validateItem,
  validateUpdate,
  blogController.updateBlogById
);
blogRoute.delete("/:id", validateItem, blogController.deleteBlogLogic);
blogRoute.post("/:id/addCategory", catWithinBlog.addCategoryToBlog);
blogRoute.delete("/:id/deleteCategory", catWithinBlog.deleteCategoryToBlog);

module.exports = blogRoute;
