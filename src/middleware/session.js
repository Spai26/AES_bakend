const { verifyToken } = require("../middleware/generateToken");
const { handlerHttpError } = require("../utils/handlerHttpError");
const UserTest = require("../models/nosql/UserTest");

const authmiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handlerHttpError(res, "NO_TIENES_PODER_AQUI", 402);
    }

    const token = req.headers.authorization.split(" ").pop();

    if (!token) {
      handlerHttpError(res, "Acceso No valido", 401);
    }

    const verified = await verifyToken(token);

    const user = await UserTest.findOne({ _id: verified.id });
    req.user = user;

    next();
  } catch (error) {
    handlerHttpError(res, "ERROR_SESSION_NO_AUTHORIZE", 500);
  }
};

module.exports = authmiddleware;
