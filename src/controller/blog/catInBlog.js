const { blog } = require("../../models");
const handlerHttpError = require("../../utils/handlerHttpError");

const addCategoryToBlog = async (req, res) => {
  const { id } = req.params;
  const { category } = req.body;
  const result = await blog.findById(id);
  try {
    if (result) {
      //implementar logica para que a su vez se guarde en la db de categorias
      //categories = [ id de array]
      result.category.push(category);
      await result.save();

      res.status(200).json({ result });
    } else {
      handlerHttpError(res, `ERROR_NO_SE_ENCONTRO_ESE_ID`, 404);
    }
  } catch (error) {
    handlerHttpError(res, `ERROR_ALGO_SALIO_MAL_EN_LA_PETICION`, 400);
  }
};

const deleteCategoryToBlog = async (req, res) => {
  const { id } = req.params;
  const { category } = req.body;

  try {
    const result = await blog.findById(id);
    if (result) {
      result.category = result.category.filter((e) => e !== category);
      await result.save();
      res.status(200).json({ message: `Categoria eliminada con exito` });
    } else {
      handlerHttpError(res, `ERROR_NO_SE_ENCONTRO_EL_ID`, 404);
    }
  } catch (error) {
    handlerHttpError(res, `ERROR_ALGO_SALIO_MAL_EN_LA_PETICION`, 400);
  }
};

module.exports = {
  addCategoryToBlog,
  deleteCategoryToBlog,
};
