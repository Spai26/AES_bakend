const handlerHttpError = require("../utils/handlerHttpError");
const { category } = require("../models");
const { matchedData } = require("express-validator");

/**
 * !TODO: obtener todas las categorias
 */
const getAllCategory = async (req, res) => {
  try {
    const result = await category.find({});
    if (!result.length) {
      handlerHttpError(res, "No hay categorias creadas", 404);
    }

    res.status(200).json(result);
  } catch (error) {
    handlerHttpError(res, "ERROR_getItems_category", 500);
  }
};

/**
 * !TODO: crear una nueva categoria
 */
const newCategory = async (req, res) => {
  const { name } = matchedData(req);

  try {
    const result = new category({ name: name });
    await result.save();

    res.status(200).json(result);
  } catch (error) {
    handlerHttpError(
      res,
      "Categoria no creada, algo inesperado paso o ya existe",
      400
    );
  }
};

/**
 * !TODO: actualizar categoria
 */
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await category.findByIdAndUpdate({ _id: id }, req.body);

    /* console.log(result) */
    res.status(202).json({ message: "categoria actualizada" });
  } catch (error) {
    console.error(error);
    handlerHttpError(res, "Error al actualizar o ya existe", 400);
  }
};

/**
 * !TODO: Eliminacion de la categoria
 */
const deleteCategory = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;

    const isExist = await category.findOne({ _id: id });

    if (!isExist) {
      handlerHttpError(res, "Categoria no encontrada", 404);
      return;
    }

    await category.deleteOne({ _id: id });

    res.status(200).json({
      message: "categoria eliminada",
    });
  } catch (error) {
    console.error(error);
    handlerHttpError(res, "Algo inesperado sucedio!", 400);
  }
};

module.exports = {
  getAllCategory,
  newCategory,
  updateCategory,
  deleteCategory,
};
