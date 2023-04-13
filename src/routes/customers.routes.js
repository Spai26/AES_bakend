const { Router } = require("express");
const Customer = require("../controller/customers/customers.controller");
const {validatorRegisterCustomer, validatorRegisterSpecialist } = require("../validators/Customer")

const customerRoute = Router(); 

customerRoute.get("/", Customer.getAllCustomers);
customerRoute.post("/", validatorRegisterCustomer, Customer.RegisterCustomer );
customerRoute.post("/specialist", validatorRegisterSpecialist, Customer.RegisterCustomerSpecialist );


module.exports = customerRoute;
