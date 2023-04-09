const eventController = require("./events.controller");
const { searchEvent } = require("./searchEvent");
const handlerHttpError = require("../../utils/handlerHttpError");

/**
 *!TODO: funcion de distribucion de funcionalidad
 */
const SearchOrAllBlogs = async (req, res) => {
  const { search } = req.query;

  //busqueda por titulo
  if (search) {
    console.log("search =>");
    try {
      const result = await searchEvent(search);
      return res.status(200).send(result);
    } catch (error) {
      handlerHttpError(res, "Este titulo no existe", 400);
    }
  }

  console.log("all =>");
  try {
    const result = await eventController.getAllEvents();

    if (!result.length) {
      return handlerHttpError(res, "No hay Eventos creados !");
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    handlerHttpError(res, "ERROR_DIS_EVENT", 500);
  }
};

module.exports = SearchOrAllBlogs;