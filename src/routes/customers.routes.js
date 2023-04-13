const { Router } = require("express");
const Customer = require("../controller/customers/customers.controller");
const {validatorRegisterCustomer, validatorRegisterSpecialist } = require("../validators/Customer")

const customerRoute = Router(); 
customerRoute.get("/", (req, res) => {
  res.send({ data: "client" });
});
/* customerRoute.get("/", EventClient.AddcustomerRoute);
customerRoute.get("/:id", EventClient.AddcustomerRouteById);
customerRoute.post("/", EventClient.CreatecustomerRoute);
customerRoute.put("/:id", EventClient.UpdatecustomerRoute); */

module.exports = customerRoute;
