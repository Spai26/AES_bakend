const {createEvent, addEventsDb, editEvent, addEventById, addEventByName, getEventSubscribers, addEventBySlog  } = require("../../controllers/Event/event.controller");

const AddEvents = async (req, res) => {
    const { title, slug } = req.query;
    try {
        const allEvents = await addEventsDb();
        if(!title && !slug) {
            res.status(200).json(allEvents);
        } else {
            const event = await addEventByName(title);
            const addSlug = await addEventBySlog(slug)
            event ? res.status(200).json(event) : res.status(200).json(addSlug)
        }
    } catch (error) {
        res.status(500).json({mesagge: "ERROR ADD EVENTS" })
    } 
};

const AddEventById = async (req, res) => {
    const { id } = req.params;
        if(!id) return res.status(500).json({ message: 'EVENT NOT FOUND' });
    try {
        const event = await addEventById(id);
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({mesagge: "ERROR EVENT BY ID" })
    } 

};

const GetEventSubscribersById = async (req, res) => {
    const {eventId} = req.params; 
    try {
        if(!eventId) return res.status(500).json({ message: 'EVENT NOT FOUND' });
        const event = await getEventSubscribers(eventId);
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({mesagge: "ERROR EVENT SUBSCRIBERS" })
    }
};

const CreateEvent = async (req, res) => {
    const {title, frontpage, date, location, description, category} = req.body;
    try {
        if (!title || !frontpage || !date || !location || !description  ) {
            return res.status(500).json({ message: 'MISSING REQUIRED FIELDS' });
          }
        const result = await createEvent(title, frontpage, date, location, description, category);
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({mesagge: "ERROR CREATING EVENT" })
    }
};

 const UpdateEvent = async(req, res) => {
    const { id } = req.params;
    const { title, frontpage, date, location, description, category } = req.body;
    try {
         if (!id || !title || !frontpage || !date || !location || !description ) {
          return res.status(500).json({ error: 'ENTER ATTRIBUTES TO MODIFY' });
         }
   
      const event = await editEvent(id, title, frontpage, date, location, description, category );
      res.status(200).json(event);

    } catch (err) {
      res.status(500).json({ message: "ERROR UPDATING EVENT" });
    }
  };

module.exports = {
    AddEvents,
    AddEventById,
    CreateEvent,
    UpdateEvent,
    GetEventSubscribersById
 };