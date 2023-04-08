const { Router } = require("express");
const authmiddleware = require("../middleware/session");
const {
    validatorCreateBlog,
    validatorGetBlogById,
    validatorAddCategoryInBlog,
    validatorDeleteCategoryInBlog,
    validatorUpdateBlog,
    validatorDeleteBlogById
} = require('../validators/blogTest')
const {
    getItemsBlogs,
    createBlog,
    getBlogBySlugOrName,
    getBlogById,
    addCategoryToBlog,
    deleteCategoryToBlog,
    updateBlogById,
    deleteBlogById,
} = require('../controller/blog.controller')

const blogRoute = Router();

//https://projectaes-production.up.railway.app/blogs/

//authmiddleware
blogRoute.get("/", getItemsBlogs);
blogRoute.post("/", validatorCreateBlog, createBlog);

blogRoute.get("/search", getBlogBySlugOrName);

blogRoute.get("/:id", validatorGetBlogById, getBlogById);
blogRoute.put("/:id", validatorUpdateBlog, updateBlogById);
blogRoute.delete("/:id", validatorDeleteBlogById, deleteBlogById);

blogRoute.post("/:id/addCategory", validatorAddCategoryInBlog, addCategoryToBlog);
blogRoute.delete("/:id/deleteCategory", validatorDeleteCategoryInBlog, deleteCategoryToBlog);

module.exports = blogRoute;
