/**
 * !TODO: trae al usuario
 */
const isExist = (id, model) => {
  const result = model.findOne({ _id: id });
  return result;
};

module.exports = { isExist };
