const { Router } = require("express");
const AuthHandler = require("../handlers/Auth/Auth.handler");
const authRoute = Router();

authRoute.post("/register", AuthHandler.RegisterUser);
authRoute.post("/login", AuthHandler.LoginUser);

module.exports = authRoute;
