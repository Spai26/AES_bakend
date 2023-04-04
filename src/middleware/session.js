const { verifyToken } = require("../middleware/generateToken");
const { handlerHttpErrror } = require("../middleware/handlerHttpError");
const User = require("../database/User.model");

const authmiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handlerHttpErrror(res, "NO_TIENES_PODER_AQUI", 402);
    }

    const token = req.headers.authorization.split(" ").pop();

    if (!token) {
      handlerHttpErrror(res, "Acceso No valido", 401);
    }

    const verified = await verifyToken(token);

    const user = await User.findOne({ _id: verified.id });
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authmiddleware;
