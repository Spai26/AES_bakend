const { Router } = require("express");
const handerCrudBlog = require("../handlers/Blog/blogCrud.handler");
const SearchOrAllBlogs = require("../handlers/Blog/blog.handlers");
const deleteCategoriaInBlog = require("../handlers/Blog/blogDeleteCategoria.handlers");
const deleteBlog = require("../handlers/Blog/blogDelete.handlers");
const addCategoryToBlog = require("../handlers/Blog/addCategoryInBlog.handlers");
const authmiddleware = require("../middleware/session")

const blogRoute = Router();

//https://projectaes-production.up.railway.app/blogs/

blogRoute.get("/", SearchOrAllBlogs);
blogRoute.post("/", handerCrudBlog.createNewBlog);
blogRoute.get("/search", handerCrudBlog.getBlogBySlug);

blogRoute.get("/:id", handerCrudBlog.getById);
blogRoute.put("/:id", handerCrudBlog.updateBlogbyId);
blogRoute.delete("/:id", deleteBlog);

blogRoute.post('/:id/addTag', handerCrudBlog.addTagToBlog)
blogRoute.delete('/:id/deleteTag', handerCrudBlog.deleteTagInBlog)

blogRoute.post("/:id/addCategory", addCategoryToBlog);
blogRoute.delete("/:id/deleteCategory", deleteCategoriaInBlog);

module.exports = blogRoute