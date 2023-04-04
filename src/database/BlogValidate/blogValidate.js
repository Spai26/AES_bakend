const Blog = require("../Blog.model");

const listaDeCategorias = async () => {
  const result = await Blog.aggregate([
    {
      $lookup: {
        from: "Category",
        localField: "categories",
        foreignField: "_id",
        as: "categories",
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        image: 1,
        status: 1,
        createdAt: 1,
        updatedAt: 1,
        slug: 1,
        categories: 1,
        category: 1,
      },
    },
  ]).exec();
  return result;
};

module.exports = listaDeCategorias;
