const { Router } = require("express");
/* const handerCrudBlog = require("../handlers/Blog/blogCrud.handler");
const SearchOrAllBlogs = require("../handlers/Blog/blog.handlers");
const deleteCategoriaInBlog = require("../handlers/Blog/blogDeleteCategoria.handlers");
const deleteBlog = require("../handlers/Blog/blogDelete.handlers");
const addCategoryToBlog = require("../handlers/Blog/addCategoryInBlog.handlers");*/
/* const blogController = require("../controller/blog/blog.controller"); */
const blogController = require("../controller/blog/blog.controller");
const blogRoute = Router();

/* blogRoute.get("/", SearchOrAllBlogs); */
blogRoute.post("/", blogController.createBlog);
/* blogRoute.get("/:id", blogController.detailBlog); */
blogRoute.put("/:id", blogController.updateBlogById);
/* blogRoute.delete("/:id", blogController.deleteBlog); */
blogRoute.get("/search", );
/* blogRoute.get("/search", handerCrudBlog.getBlogByName);
blogRoute.post("/categoria", addCategoryToBlog);
blogRoute.delete("/categoria", deleteCategoriaInBlog);
blogRoute.get("/:blogId", handerCrudBlog.getById);
blogRoute.put("/:id/update", handerCrudBlog.updateBlogbyId);
blogRoute.delete("/:id", deleteBlog);
blogRoute.post("/:id/addCategory", addCategoryToBlog);
blogRoute.delete("/:id/deleteCategory", deleteCategoriaInBlog); */

module.exports = blogRoute;
