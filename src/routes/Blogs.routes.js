const { Router } = require("express");
const handerCrudBlog = require("../handlers/Blog/blogCrud.handler");
const SearchOrAllBlogs = require("../handlers/Blog/blog.handlers");
const deleteCategoriaInBlog = require("../handlers/Blog/blogDeleteCategoria.handlers");
const deleteBlog = require("../handlers/Blog/blogDelete.handlers");
const addCategoryToBlog = require("../handlers/Blog/addCategoryInBlog.handlers");
const authmiddleware = require("../middleware/session");
const { handlerHttpError } = require("../middleware/handlerHttpError");

const blogRoute = Router();

//https://projectaes-production.up.railway.app/blogs/

blogRoute.get("/",authmiddleware, SearchOrAllBlogs);
blogRoute.post("/", handerCrudBlog.createNewBlog);
blogRoute.get("/search", handerCrudBlog.getBlogByName);
blogRoute.post("/categoria", addCategoryToBlog);
blogRoute.delete("/categoria", deleteCategoriaInBlog);
blogRoute.get("/:blogId", handerCrudBlog.getById);
blogRoute.put("/:id/update", handerCrudBlog.updateBlogbyId);
blogRoute.delete("/:id", deleteBlog);
blogRoute.post("/:id/addCategory", addCategoryToBlog);
blogRoute.delete("/:id/deleteCategory", deleteCategoriaInBlog);

module.exports = blogRoute;
