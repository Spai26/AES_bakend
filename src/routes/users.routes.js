const { Router } = require("express");
const userController = require("../controller/user/user.controller");
const authmiddleware = require("../middleware/session");
const {
  validatorCreateUser,
  validatorGetItems,
} = require("../validators/User");
const userRoute = Router();

userRoute.get("/", userController.getAllItems);
userRoute.post(
  "/",
  authmiddleware,
  validatorCreateUser,
  userController.createUser
);
userRoute.get("/:id", validatorGetItems, userController.detailUser);
userRoute.put(
  "/:id",
  authmiddleware,
  validatorGetItems,
  userController.updateUser
);
userRoute.delete(
  "/:id",
  authmiddleware,
  validatorGetItems,
  userController.deleteUser
);

module.exports = userRoute;
