const { Router } = require("express");
const userController = require("../controller/user/user.controller");

const {
  validatorGetItems,
  validatorCreateUser,
  validateUpdate,
} = require("../validators/User");
const isAuth = require("../middleware/sessionAuth");
const checkrol = require("../middleware/roleAuth");

const userRoute = Router();

userRoute.get("/", isAuth, checkrol(["admin"]), userController.getAllItems);
userRoute.post(
  "/",
  isAuth,
  checkrol(["admin"]),
  validatorCreateUser,
  userController.createUser
);
userRoute.get(
  "/:id",
  isAuth,
  checkrol(["admin"]),
  validatorGetItems,
  userController.detailUser
);
userRoute.put(
  "/:id",
  isAuth,
  checkrol(["admin"]),
  validatorGetItems,
  validateUpdate,
  userController.updateUser
);
userRoute.delete(
  "/:id",
  isAuth,
  checkrol(["admin"]),
  validatorGetItems,
  userController.deleteUser
);

module.exports = userRoute;
