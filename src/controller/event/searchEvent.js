const { event } = require("../../models");

/**
 * !TODO: busqueda de blogs por titulo
 */
const searchEvent = async (search) => {
  const result = await event.find({ title: { $regex: search, $options: "i" } });
  return result;
};

module.exports = { searchEvent };
