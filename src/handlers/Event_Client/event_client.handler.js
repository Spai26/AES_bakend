const {
  addEvent_ClientDb,
  addEvent_ClientById,
  addEvent_ClientByName,
  createEvent_Client,
  editEvent_Client,
} = require("../../controllers/Event_Client/event_client.controller");

const AddEvent_Client = async (req, res) => {
    const { name } = req.query;
  try {
    if(!name) {
      const allSubscribed = await addEvent_ClientDb();
      res.status(200).json(allSubscribed);
    }
      const eventClient = await addEvent_ClientByName(name);
      res.status(200).json(eventClient);
  } catch (error) {
    res.status(500).json({ mesagge: "ERROR ADD EVENT_CLIENT" });
  }
};

const AddEvent_ClientById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) return res.status(500).json("ERROR ID DOES NOT EXIST");
    const event_client = await addEvent_ClientById(id);
    res.status(200).json(event_client);
  } catch (error) {
    res.status(500).json({ mesagge: "ERROR ADD EVENT_CLIENT BY ID" });
  }
};

const CreateEvent_Client = async (req, res) => {
  const { name, email, lastname, event } = req.body;
  try {
    if (!name || !email || !lastname || !event) return res.status(500).json("ERROR REQUIRED FIELDS");
    const newEvent_Client = await createEvent_Client(name, email, lastname, event);
    res.status(200).json(newEvent_Client);
  } catch (error) {
    res.status(500).json({ mesagge: "ERROR TO CREATE EVENT_CLIENT" });
  }
};

const UpdateEvent_Client = async (req, res) => {
  const { id } = req.params;
  const { name, lastname, email, event } = req.body;
  try {
    if (!id || !name || !lastname || !email || !event) {
      return res.status(500).json({ error: "ENTER ATTRIBUTES TO MODIFY" });
    }

    const event_client = await editEvent_Client(id, name, lastname, email, event);
    res.status(200).json(event_client);
  } catch (error) {
    res.status(500).json({ message: "ERROR UPDATING EVENT_CLIENT" });
  }
};

module.exports = {
  AddEvent_Client,
  AddEvent_ClientById,
  CreateEvent_Client,
  UpdateEvent_Client,
};
