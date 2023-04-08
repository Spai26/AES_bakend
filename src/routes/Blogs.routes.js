const { Router } = require("express");
const SearchOrAllBlogs = require("../controller/blog/blog.index");
const blogController = require("../controller/blog/blog.controller");
const { validateNewBlog, validateUpdate } = require("../validators/Blog");
const { validateItem } = require("../validators/general");
const isAuth = require("../middleware/session");
const blogRoute = Router();

blogRoute.get("/", SearchOrAllBlogs);
blogRoute.post("/", isAuth, validateNewBlog, blogController.setCreateBlog);
blogRoute.get("/:id", validateItem, blogController.getDetailBlog);
blogRoute.put(
  "/:id",
  isAuth,
  validateItem,
  validateUpdate,
  blogController.updateBlogById
);
blogRoute.delete("/:id", isAuth, validateItem, blogController.deleteBlogLogic);

/*
blogRoute.post("/categoria", addCategoryToBlog);
blogRoute.delete("/categoria", deleteCategoriaInBlog);
blogRoute.get("/:blogId", handerCrudBlog.getById);
blogRoute.put("/:id/update", handerCrudBlog.updateBlogbyId);
blogRoute.delete("/:id", deleteBlog);
blogRoute.post("/:id/addCategory", addCategoryToBlog);
blogRoute.delete("/:id/deleteCategory", deleteCategoriaInBlog); */

module.exports = blogRoute;
