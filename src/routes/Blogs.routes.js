const { Router } = require("express");
/* const handerCrudBlog = require("../handlers/Blog/blogCrud.handler");
const SearchOrAllBlogs = require("../handlers/Blog/blog.handlers");
const deleteCategoriaInBlog = require("../handlers/Blog/blogDeleteCategoria.handlers");
const deleteBlog = require("../handlers/Blog/blogDelete.handlers");
const addCategoryToBlog = require("../handlers/Blog/addCategoryInBlog.handlers");*/
/* const blogController = require("../controller/blog/blog.controller"); */
const SearchOrAllBlogs = require("../controller/blog/blog.index");
const blogController = require("../controller/blog/blog.controller");

const { validateNewBlog, validateUpdate } = require("../validators/Blog");
const { validateItem } = require("../validators/general");
const blogRoute = Router();

blogRoute.get("/", SearchOrAllBlogs);
blogRoute.post("/", validateNewBlog, blogController.setCreateBlog);
blogRoute.get("/:id", validateItem, blogController.getDetailBlog);
blogRoute.put("/:id", validateItem, blogController.updateBlogById);
blogRoute.delete("/:id", validateItem, blogController.deleteBlogLogic);
blogRoute.get("/search");
/* blogRoute.get("/search", handerCrudBlog.getBlogByName);
blogRoute.post("/categoria", addCategoryToBlog);
blogRoute.delete("/categoria", deleteCategoriaInBlog);
blogRoute.get("/:blogId", handerCrudBlog.getById);
blogRoute.put("/:id/update", handerCrudBlog.updateBlogbyId);
blogRoute.delete("/:id", deleteBlog);
blogRoute.post("/:id/addCategory", addCategoryToBlog);
blogRoute.delete("/:id/deleteCategory", deleteCategoriaInBlog); */

module.exports = blogRoute;
