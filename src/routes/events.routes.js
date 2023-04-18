const { Router } = require("express");
const eventController = require("../controller/event/events.controller");
const searchOrAllEvents = require("../controller/event/event.index");
const { validatorAddEvent } = require("../validators/Event");
const { validateItem } = require("../validators/general");
const isAuth = require("../middleware/sessionAuth");
const checkrol = require("../middleware/roleAuth");
const eventRouter = Router();

eventRouter.get("/", searchOrAllEvents);
eventRouter.post("/", validatorAddEvent, eventController.createEvent);
eventRouter.get("/:id", validateItem, eventController.detailEventForid);
eventRouter.put(
  "/:id",
  validateItem,
  validatorAddEvent,
  eventController.updateEventByid
);
eventRouter.delete(
  "/:id",
  isAuth,
  checkrol(["admin"]),
  validateItem,
  eventController.deleteEventByid
);

module.exports = eventRouter;
