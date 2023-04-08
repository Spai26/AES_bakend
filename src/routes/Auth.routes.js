const { Router } = require("express");
const AuthController = require("../controller/auth/auth.controller");
const authRoute = Router();

/* authRoute.post("/register", RegisterUser); */
authRoute.post("/login", AuthController.authLogin);
authRoute.post("/logout", AuthController.logOut);

module.exports = authRoute;
