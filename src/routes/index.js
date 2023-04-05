const { Router } = require("express");
const errohander = require("../middleware/handlerError");
const fs = require("fs");
const routes = Router();
const { validatorCreateUser } = require("../validators/userTest");
const userController = require("../controller/user.controller");
/**
 * !TODO: Esta ruta es dinamica no se necesita agregar ninguna ruta adicional que sean rutas claras y especificas
 */
const PATH_ROUTES = __dirname;
const removeExtends = (filename) => {
  //user.routes.js
  return filename.split(".").shift();
};

fs.readdirSync(PATH_ROUTES).filter((file) => {
  const fileClean = removeExtends(file);
  if (fileClean !== "index") {
    routes.use(`/${fileClean}`, require(`./${file}`));
  } else {
    routes.use(errohander);
  }
});

routes.get("/", (req, res) => {
  res.send(
    "this root page, If you are here, everything is fine 🧑 ✈ ☯  /para los spanglish si estas aqui es que todo esta bien 🙂🔥🔥🔥🔥   "
  );
});
/* 
routes.get("/test", (req, res) => {
  res.writeHead(200, { "content-type": "text/html" });
  res.end(`<h1>Upload Your File Here :)</h1>
    <form
        action="/"
        method="post"
        enctype="multipart/form-data"
    >
        <fieldset>
            <legend>Upload your file</legend>
            <label for="photo">File:</label>
            <input type="file" name="image" id="image" />
            
        </fieldset>
        <button type="submit">Upload</button>
    </form>`);
});
 */
routes.post("/", validatorCreateUser, userController.createUser);

module.exports = routes;
