const {createEvent, addEventsDb, editEvent, addEventById, addEventByName, getEventSubscribers  } = require("../../controllers/Event/event.controller");

const AddEvents = async (req, res) => {
    const { title } = req.query;
    try {
        if(!title) {
        const allEvents = await addEventsDb();
        res.status(200).json(allEvents);
    } else {
        const event = await addEventByName(title);
        res.status(200).json(event);
    }
    } catch (error) {
        res.status(404).json({mesagge: "error add events" })
    } 
};

const AddEventById = async (req, res) => {
    const { id } = req.params;
        if(!id) return res.status(404).json({ message: 'Event not found' });
    try {
        const event = await addEventById(id);
        res.status(200).json(event);
    } catch (error) {
        res.status(404).json({mesagge: "error event by id" })
    } 

};

const GetEventSubscribersById = async (req, res) => {
    const {eventId} = req.params; 
    try {
        if(!eventId) return res.status(404).json({ message: 'Event not found' });
        const event = await getEventSubscribers(eventId);
        res.status(200).json(event);
    } catch (error) {
        res.status(404).json({mesagge: "error event subscribers" })
    }
};

const CreateEvent = async (req, res) => {
    const {title, frontpage, date, location, description, category} = req.body;
    try {
        if (!title || !frontpage || !date || !location || !description || !category ) {
            return res.status(400).json({ message: 'Missing required fields' });
          }
        const result = await createEvent(title, frontpage, date, location, description, category);
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({mesagge: "error crating event" })
    }
};

 const UpdateEvent = async(req, res) => {
    const { id } = req.params;
    const { title, frontpage, date, location, description, category } = req.body;
    try {
         if (!id || !title || !frontpage || !date || !location || !description || !category) {
          return res.status(400).json({ error: 'Enter attributes to modify' });
         }
   
      const event = await editEvent(id, title, frontpage, date, location, description, category );
      res.status(200).json(event);

    } catch (err) {
      res.status(404).json({ message: "Error updating event" });
    }
  };

module.exports = {
    AddEvents,
    AddEventById,
    CreateEvent,
    UpdateEvent,
    GetEventSubscribersById
 };