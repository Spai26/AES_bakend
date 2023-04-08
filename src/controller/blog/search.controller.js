const { blog } = require("../../models");

const searchBlog = async (search) => {
  const result = await blog.find({ title: { $regex: search, $options: "i" } });

  return result;
};

module.exports = searchBlog;
