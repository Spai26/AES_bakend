const { Router } = require("express");
const eventController = require("../controller/events");

const eventRouter = Router();

/* eventRouter.post("/", enventHandlers.CreateEvent);
eventRouter.get("/", enventHandlers.AddEvents);
eventRouter.get("/:id", enventHandlers.AddEventById);
eventRouter.get("/:eventId/subscribers", enventHandlers.GetEventSubscribersById);
eventRouter.put("/:id", enventHandlers.UpdateEvent); */

module.exports = eventRouter;
