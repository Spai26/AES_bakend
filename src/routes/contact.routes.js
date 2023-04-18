const { Router } = require("express");
const contactController = require("../controller/contact.controller");
const { validatorContact } = require("../validators/contact");
const contactRoute = Router();

contactRoute.get(
  "/",
  isAuth,
  checkrol(["admin"]),
  contactController.showMessage
);
contactRoute.get(
  "/:id",
  isAuth,
  checkrol(["admin"]),
  contactController.getContactbyId
);
contactRoute.post("/", validatorContact, contactController.registerFrom);

module.exports = contactRoute;
