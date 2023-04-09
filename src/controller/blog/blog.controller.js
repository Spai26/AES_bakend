const { matchedData } = require("express-validator");
const handlerHttpError = require("../../utils/handlerHttpError");
const { blog } = require("../../models");

/**
 *!TODO: obtener la lista de blogs
 * ?no lleva trycatch por que hay otro punto de control blog.index
 */
const getAllBlogs = async () => {
  const data = await blog.find({}).populate("categories");
  return data;
};

/**
 * !TODO: crear un blog en nuestro modelo con categoria
 * ?la categoria debe existir y solo recibe id
 */
const setCreateBlog = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = new blog(body);
    const result = await data.save();
    res.status(200).json(result);
  } catch (error) {
    handlerHttpError(res, "Blog no creado, valida los campos");
  }
};

/**
 * !TODO: detalle de blog
 */
const getDetailBlog = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;

    const result = await blog.findOne({ _id: id });
    res.status(200).json(result);
  } catch (error) {
    handlerHttpError(res, "Blog no encontrado!", 404);
  }
};

/**
 * !TODO: actualizar blog
 */
const updateBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const result = await blog.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          title: body.title,
          image: body.image,
          description: body.description,
          status: body.status,
          categories: body.categories,
        },
      }
    );

    await blog.updateSlug(id);
    /*console.log(result) */
    res.status(200).json({ message: "blog actualizado!" });
  } catch (error) {
    console.error(error);
    handlerHttpError(res, `No se pudo actualizar verifica los campos`, 400);
  }
};

/**
 * !TODO: borrado logico
 */
const deleteBlogLogic = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;

    const isExist = await blog.findOne({ _id: id });

    if (!isExist) {
      return handlerHttpError(res, "Blog no encontrado!", 404);
    }
    const result = await blog.delete({ _id: id });

    res.status(200).json({ message: "Blog eliminado!" });
  } catch (error) {
    handlerHttpError(res, `Error al elimina, intenta luego`, 500);
  }
};

module.exports = {
  getAllBlogs,
  setCreateBlog,
  getDetailBlog,
  updateBlogById,
  deleteBlogLogic,
};
