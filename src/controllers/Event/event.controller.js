const Event = require("../../database/Event.model");
const Event_Client = require("../../database/Event_Client.model");


const addEventsDb = async () => {
    const allEvents = await Event.find();
    return allEvents;
};

const addEventById = async (id) => {
    const event = await Event.findById(id);
    return event;
};

const addEventByName = async (title) => {
    const name = { $regex: new RegExp(`^${title}$`, 'i')};

    const event = await Event.findOne({ title: name });
    return event;
};

const getEventSubscribers = async (eventId) => {
    let event = await Event.findById(eventId);
    let eventSubscribs =  await Event_Client.find({ event: event.title });
    let subscribs = eventSubscribs.map(obj => obj._id);
    event.subscribers = subscribs;
    await event.save();
    return event;
};

const createEvent = async (title, frontpage, date, location, description, category) => {
    const newEvent = new Event({
        title,
        frontpage,
        date,
        location,
        description,
        category
    });
    const results = await newEvent.save();
    return results;
};

const editEvent = async (id, title, frontpage, date, location, description, category) => {

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
};


module.exports = {
    addEventsDb,
    addEventById,
    addEventByName,
    getEventSubscribers,
    createEvent,
    editEvent
};
