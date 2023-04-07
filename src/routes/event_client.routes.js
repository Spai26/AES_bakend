const { Router } = require("express");
/* const EventClient = require("../handlers/Event_Client/event_client.handler")*/

const event_client = Router(); 
event_client.get("/", (req, res) => {
  res.send({ data: "client" });
});
/* event_client.get("/", EventClient.AddEvent_Client);
event_client.get("/:id", EventClient.AddEvent_ClientById);
event_client.post("/", EventClient.CreateEvent_Client);
event_client.put("/:id", EventClient.UpdateEvent_Client); */

module.exports = event_client;
