/**
 * !TODO: trae al usuario
 */
const isExist = (model, option = { _id: id }) => {
  const result = model.findOne(option);
  return result;
};

module.exports = { isExist };
