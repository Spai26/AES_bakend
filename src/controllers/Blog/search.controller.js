const Blog = require("../../database/Blog.model");

const searchBlog = async (search) => {
  const result = await Blog.find({ title: { $regex: search, $options: "i" } });

  if (!result) {
    throw new Error("Este titulo no se ha creado");
  }
  return result;
};

module.exports = searchBlog;
