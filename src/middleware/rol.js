const { handlerHttpError } = require("../../utils/handlerHttpError");
const checkrol = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    next();
  } catch (error) {
    handlerHttpError(res, "No tienes asignado ningun rol", 401);
  }
};

module.exports = checkrol;
