const { Router } = require("express");
const errohander = require("../middleware/handlerError");
const fs = require("fs");
const UserController = require("../controller/user.controller");
const routes = Router();

/**
 * !TODO: Esta ruta es dinamica no se necesita agregar ninguna ruta adicional que sean rutas claras y especificas
 */
const PATH_ROUTES = __dirname;
const removeExtends = (filename) => {
  //user.routes.js
  return filename.split(".").shift();
};

const a = fs.readdirSync(PATH_ROUTES).filter((file) => {
  const fileClean = removeExtends(file);
  if (fileClean !== "index") {
    routes.use(`/${fileClean}`, require(`./${file}`));
  } else {
    routes.use(errohander);
  }
});

/* routes.get("/", (req, res) => {
  res.send(
    "this root page, If you are here, everything is fine 🧑 ✈ ☯  /para los spanglish si estas aqui es que todo esta bien 🙂🔥🔥🔥🔥   "
  );
});
 */
routes.get("/", UserController.getAllorSearchUser);
routes.post("/", UserController.createUser);

module.exports = routes;
