/**
 * !TODO: Este middleware funcionara para los mensajes de errores en los controladores
 * @param {*} res
 * @param {*} message
 * @param {*} code
 */
const handlerHttpError = (res, message = "PROCESO_NO_ESPERADO", code = 500) => {
  res.status(code);
  res.send({ error: message });
};

module.exports = { handlerHttpError };
