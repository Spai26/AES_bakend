const { Router } = require("express");
const userController = require("../controller/user/user.controller");
/* const checkrol = require("../middleware/rol"); */
const authmiddleware = require("../middleware/session");
const {
  validatorCreateUser,
  validatorGetItems,
} = require("../validators/User");
const userRoute = Router();

userRoute.get("/", authmiddleware, userController.getAllItems);
userRoute.post("/", validatorCreateUser, userController.createUser);
userRoute.get("/:id", validatorGetItems, userController.detailUser);
userRoute.put("/:id", validatorGetItems, userController.updateUser);
userRoute.delete("/:id", validatorGetItems, userController.deleteUser);

module.exports = userRoute;
