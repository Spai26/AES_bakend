const { Router } = require("express");
const authmiddleware = require("../middleware/session");
const {
    validatorCreateBlog,
    validatorGetBlogByName,
    validatorGetBlogBySlug,
    validatorGetBlogById,
    validatorAddCategoryInBlog,
    validatorDeleteCategoryInBlog,
    validatorUpdateBlog,
    validatorDeleteBlogById
} = require('../validators/blogTest')
const {
    getItemsBlogs,
    createBlog,
    getBlogBySlug,
    getBlogByName,
    getBlogById,
    addCategoryToBlog,
    deleteCategoryToBlog,
    updateBlogById,
    deleteBlogById,
} = require('../controller/blog.controller')

const blogRoute = Router();

//https://projectaes-production.up.railway.app/blogs/
//,authmiddleware
blogRoute.get("/", authmiddleware, getItemsBlogs);
blogRoute.post("/", validatorCreateBlog, createBlog);

blogRoute.get('/name', validatorGetBlogByName, getBlogByName)
blogRoute.get("/search", validatorGetBlogBySlug, getBlogBySlug);

blogRoute.get("/:id", validatorGetBlogById, getBlogById);
blogRoute.put("/:id/update", validatorUpdateBlog, updateBlogById);
blogRoute.delete("/:id", validatorDeleteBlogById, deleteBlogById);

blogRoute.post("/:id/addCategory", validatorAddCategoryInBlog, addCategoryToBlog);
blogRoute.delete("/:id/deleteCategory", validatorDeleteCategoryInBlog, deleteCategoryToBlog);

module.exports = blogRoute;
