const { Router } = require("express");
const AuthController = require("../controller/auth/auth.controller");
const { validatorAuthLogin } = require("../validators/User");
const isAuth = require("../middleware/sessionAuth");

const authRoute = Router();

/* authRoute.post("/register", RegisterUser); */
authRoute.post("/login", validatorAuthLogin, AuthController.authLogin);
authRoute.post("/logout", AuthController.logOut);
authRoute.get("/dashboard", isAuth, (req, res) => {
  res.send({ message: true });
});
authRoute.post("/:id/reset-password", AuthController.changePassword);

module.exports = authRoute;
