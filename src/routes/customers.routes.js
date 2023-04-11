const { Router } = require("express");
const Customer = require("../controller/customers/customers.controller");
const {validatorCreateCustomer, validateUpdateCustomer } = require("../validators/Customer")

const customerRoute = Router(); 

customerRoute.get("/", Customer.getAllCustomers);
customerRoute.post("/", validatorCreateCustomer, Customer.createCustomer );
customerRoute.put("/:id", validateUpdateCustomer, validatorGetItems, EventClient.updateCustomer);
// customerRoute.get("/", (req, res) => {
//   res.send({ data: "client" });
// });
/* 

customerRoute.get("/:id", EventClient.AddcustomerRouteById);
customerRoute.post("/", EventClient.CreatecustomerRoute);
customerRoute.put("/:id", EventClient.UpdatecustomerRoute); */

module.exports = customerRoute;
