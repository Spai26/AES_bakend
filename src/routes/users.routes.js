const { Router } = require("express");
const userController = require("../controller/user/user.controller");
const isAuth = require("../middleware/session");
const {
  validatorCreateUser,
  validatorGetItems,
  validateUpdate,
} = require("../validators/User");
const userRoute = Router();

userRoute.get("/", isAuth, userController.getAllItems);
userRoute.post("/", isAuth, validatorCreateUser, userController.createUser);
userRoute.get("/:id", validatorGetItems, userController.detailUser);
userRoute.put(
  "/:id",
  isAuth,
  validatorGetItems,
  validateUpdate,
  userController.updateUser
);
userRoute.delete("/:id", isAuth, validatorGetItems, userController.deleteUser);

module.exports = userRoute;
