const { Router } = require("express");
const AuthController = require("../controller/auth/auth.controller");
const { validatorAuthLogin } = require("../validators/User");
const authRoute = Router();

/* authRoute.post("/register", RegisterUser); */
authRoute.post("/login", validatorAuthLogin, AuthController.authLogin);
authRoute.post("/logout", AuthController.logOut);
authRoute.post("/:id/reset-password", AuthController.changePassword);

module.exports = authRoute;
