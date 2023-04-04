const {
  addEvent_ClientDb,
  addEvent_ClientById,
  createEvent_Client,
  editEvent_Client,
} = require("../../controllers/Event_Client/event_client.controller");

const AddEvent_Client = async (req, res) => {
  try {
    const allSubscribed = await addEvent_ClientDb();
    res.status(200).json(allSubscribed);
  } catch (error) {
    res.status(404).json({ mesagge: "error add event_client" });
  }
};

const AddEvent_ClientById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) return res.status(400).json("error id does not exist ");
    const event_client = await addEvent_ClientById(id);
    res.status(200).json(event_client);
  } catch (error) {
    res.status(404).json({ mesagge: "error add event_client by ID" });
  }
};

const CreateEvent_Client = async (req, res) => {
  const { name, email, lastname, event } = req.body;
  try {
    if (!name || !email || !lastname || !event)
      return res.status(400).json("error required fields");
    const newEvent_Client = await createEvent_Client(name, email, lastname, event);
    res.status(200).json(newEvent_Client);
  } catch (error) {
    res.status(404).json({ mesagge: "error to create event_client" });
  }
};

const UpdateEvent_Client = async (req, res) => {
  const { id } = req.params;
  const { name, lastname, email, event } = req.body;
  try {
    if (!id || !name || !lastname || !email || !event) {
      return res.status(400).json({ error: "Enter attributes to modify" });
    }

    const event_client = await editEvent_Client(id, name, lastname, email, event);
    res.status(200).json(event_client);
  } catch (err) {
    res.status(404).json({ message: "Error updating event_client" });
  }
};

module.exports = {
  AddEvent_Client,
  AddEvent_ClientById,
  CreateEvent_Client,
  UpdateEvent_Client,
};
