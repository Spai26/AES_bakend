const { Router } = require("express");
const enventHandlers = require("../handlers/Event/event.handler")

const eventRouter = Router();

eventRouter.post("/", enventHandlers.CreateEvent);
eventRouter.get("/", enventHandlers.AddEvents);
eventRouter.get("/:id", enventHandlers.AddEventById);
eventRouter.get("/:eventId/subscribers", enventHandlers.GetEventSubscribersById);
eventRouter.put("/:id", enventHandlers.UpdateEvent);



module.exports = eventRouter;