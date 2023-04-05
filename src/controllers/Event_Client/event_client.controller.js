const Event_Client = require("../../database/Event_Client.model");

const addEvent_ClientDb = async () => {
  const allSubscribed = await Event_Client.find();
  return allSubscribed;
};

const addEvent_ClientById = async (id) => {
  const event_client = await Event_Client.findById(id);

  return event_client;
};

const addEvent_ClientByName = async (name) => {
  const userName = { $regex: new RegExp(`^${name}$`, 'i')};

  const event = await Event_Client.findOne({ name: userName });
  return event;
};

const createEvent_Client = async (name, lastname, email, event) => {
  const newEvent_Client = new Event_Client({ name, lastname, email, event });
  const result = await newEvent_Client.save();
  return result;
};

const editEvent_Client = async (id, name, lastname, email, event) => {
  const event_client = await Event_Client.findById(id);

  if (!event_client) {
    return res.status(500).json({ message: "Event_Client not found" });
  }
  // Actualiza las propiedades del evento
  event_client.name = name;
  event_client.lastname = lastname;
  event_client.email = email;
  event_client.event = event;

  await event_client.save();

  return event_client;
};

module.exports = {
  addEvent_ClientDb,
  addEvent_ClientById,
  addEvent_ClientByName,
  createEvent_Client,
  editEvent_Client,
};