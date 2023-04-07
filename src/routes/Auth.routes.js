const { Router } = require("express");
const AuthController = require("../controller/auth/auth.controller");
const { validatorAuthLogin } = require("../validators/User");
const authRoute = Router();

/* authRoute.post("/register", RegisterUser); */
authRoute.post("/login", AuthController.authLogin);

module.exports = authRoute;
