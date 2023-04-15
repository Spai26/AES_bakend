const { Router } = require("express");
const contactController = require("../controller/contact.controller");
const { validatorContact } = require("../validators/contact");
const contactRoute = Router();

contactRoute.get("/", contactController.showMessage);
contactRoute.post("/", validatorContact, contactController.registerFrom);

module.exports = contactRoute;
