const { matchedData } = require("express-validator");
const { event } = require("../../models");
const { customer } = require("../../models");
const handlerHttpError = require("../../utils/handlerHttpError");
/**
 * !TODO: listar todos los eventos
 */
const getAllEvents = async () => {
  const allEvents = await event.find({});
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
    const body = matchedData(req);
    const data = new event(body);
    const result = await data.save();
    res.status(201).json(result);
  } catch (error) {
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

    const data = await event.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          title: body.title,
          location: body.location,
          frontpage: body.frontpage,
          description: body.description,
          status: body.status,
          date: body.date,
          categories: body.categories,
        },
      }
    );
    res.status(200).json({ message: "Evento actualizado" });
  } catch (error) {
    handlerHttpError(res, "verifica los campos requeridos", 404);
  }
};

const deleteEventByid = async () => {
  const allEvents = await event.find({});
  return allEvents;
};

/* 
const addEventByName = async (title) => {
  const name = { $regex: new RegExp(`^${title}$`, "i") };

  const event = await Event.findOne({ title: name });
  return event;
};

const getEventSubscribers = async (eventId) => {
  let event = await Event.findById(eventId);
  let eventSubscribs = await Event_Client.find({ event: event.title });
  let subscribs = eventSubscribs.map((obj) => obj._id);
  event.subscribers = subscribs;
  await event.save();
  return event;
};

const createEvent = async (
  title,
  frontpage,
  date,
  location,
  description,
  category
) => {
  const newEvent = new Event({
    title,
    frontpage,
    date,
    location,
    description,
    category,
  });
  const results = await newEvent.save();
  return results;
};

const editEvent = async (
  id,
  title,
  frontpage,
  date,
  location,
  description,
  category
) => {
  const event = await Event.findById(id);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }
  // Actualiza las propiedades del evento
  event.title = title;
  event.frontpage = frontpage;
  event.date = date;
  event.location = location;
  event.description = description;
  event.category = category;

  await event.save();

  return event;
}; */

module.exports = {
  getAllEvents,
  createEvent,
  detailEventForid,
  updateEventByid,
  deleteEventByid,
};
