const { blog } = require("../../models");

/**
 * !TODO: busqueda de blogs por titulo
 */
const searchBlog = async (search) => {
  const result = await blog.find({ title: { $regex: search, $options: "i" } });
  return result;
};
/**
 * !TODO: busqueda por slug debe ser ingresado conforme se genera
 */
const searchBySlug = async (slug) => {
  const result = await blog.findOne({ slug: slug });
  return result;
};

module.exports = { searchBlog, searchBySlug };
