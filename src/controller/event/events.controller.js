const { matchedData } = require("express-validator");
const { event } = require("../../models");
const { customer } = require("../../models");
const handlerHttpError = require("../../utils/handlerHttpError");
const { isExist } = require("../../libs/findUser");
const uploadImage = require("../../middleware/generateImage");
/**
 * !TODO: listar todos los eventos
 */
const getAllEvents = async () => {
  const allEvents = await event
    .find({})
    .populate("categories", "name")
    .populate("tags", "name");
  /* .populate({
      path: "categories",
      populate: { path: "categoryId", model: "Category" },
    }); */
  return allEvents;
};

/**
 * !TODO: agregar un nuevo evento
 */
const createEvent = async (req, res) => {
  try {
    const {
      title,
      frontpage,
      description,
      date_in,
      date_out,
      location,
      status,
      categories,
      tags,
    } = req.body;

    const data = new event({
      title: title,
      frontpage: await uploadImage(frontpage, { public_id: title }),
      description: description,
      date_ind: date_in,
      date_out: date_out,
      location: location,
      status: status,
      categories: categories,
      tags: tags,
    });

    await data.save();
    res.status(201).json({ message: "Evento creado con éxito!" });
  } catch (error) {
    console.error(error);
    handlerHttpError(
      res,
      "Evento no pudo crearse o tiene titulo duplicado",
      404
    );
  }
};

/**
 * !TODO: Obtener el detalle del evento
 */
const detailEventForid = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;

    const isExist = await event.findOne({ _id: id });

    if (!isExist) {
      return handlerHttpError(res, "Evento no existe!", 404);
    }

    const result = await event.findById(id);
    res.status(200).json(result);
  } catch (error) {
    handlerHttpError(res, "Este evento no valido");
  }
};

/**
 * !TODO: update evento
 */
const updateEventByid = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const isExist = await event.findOne({ _id: id });

    if (!isExist) {
      return handlerHttpError(res, "Evento no existe!", 404);
    }

    const data = await event.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          title: body.title,
          location: body.location,
          frontpage: await uploadImage(body.frontpage),
          description: body.description,
          status: body.status,
          date_in: body.date,
          date_out: body.date,
          categories: body.categories,
        },
      }
    );
    res.status(200).json({ message: "Evento actualizado" });
  } catch (error) {
    console.error(error);
    handlerHttpError(res, "Verifica los campos requeridos", 404);
  }
};

const deleteEventByid = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;

    const isExist = await event.findOne({ _id: id });

    if (!isExist) {
      return handlerHttpError(res, "Evento no encontrado!", 404);
    }

    const result = await event.delete({ _id: id });
    res.status(200).json({ message: "Evento eliminado!" });
    res.send({ data, id });
  } catch (error) {
    handlerHttpError(res, "Error al eliminar, intenta despues");
  }
};

module.exports = {
  getAllEvents,
  createEvent,
  detailEventForid,
  updateEventByid,
  deleteEventByid,
};
