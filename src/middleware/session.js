const { verifyToken } = require("../middleware/generateToken");
const { handlerHttpError } = require("../utils/handlerHttpError");
<<<<<<< HEAD
const UserTest = require("../models/nosql/UserTest");
=======
const { user } = require("../models/");
>>>>>>> 9806d1ddfb05f37973355f80fb09708959b9fdda

const isAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handlerHttpError(res, "NO_TIENES_PODER_AQUI", 402);
      return;
    }

    const token = req.headers.authorization.split(" ").pop();

    if (!token) {
      handlerHttpError(res, "Acceso No valido", 401);
      return;
    }

    const verified = await verifyToken(token);

<<<<<<< HEAD
    const user = await UserTest.findOne({ _id: verified.id });
    req.user = user;
=======
    const foundUser = await user.findOne({ _id: verified.id });

    req.user = foundUser;
>>>>>>> 9806d1ddfb05f37973355f80fb09708959b9fdda

    next();
  } catch (error) {
    handlerHttpError(res, "ERROR_SESSION_NO_AUTHORIZE", 500);
  }
};

module.exports = isAuth;
