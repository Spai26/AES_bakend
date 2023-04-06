const { Router } = require("express");
const errohander = require("../middleware/handlerError");
const fs = require("fs");
const { LoginUser } = require("../handlers/Auth/Auth.handler");
const authmiddleware = require("../middleware/session");
const routes = Router();

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

routes.get("/dashboard", authmiddleware, (req, res) => {
  res.send(
    "this root page, If you are here, everything is fine 🧑 ✈ ☯  /para los spanglish si estas aqui es que todo esta bien 🙂🔥🔥🔥🔥   "
  );
});

routes.get("/auth/login", (req, res) => {
  res.writeHead(200, { "content-type": "text/html" });
  res.end(`<h1>Upload Your File Here :)</h1>
    <form
        action="/dashboard"
        method="get"
        enctype="multipart/form-data"
    >
        <fieldset>
            <legend>TESTING LOGIN</legend>
            <label for="email">Email:</label>
            <input type="text" name="email" id="email" />
            <label for="password">Password:</label>
            <input type="password" name="password" id="password" />
        </fieldset>
        <button type="submit">Upload</button>
    </form>`);
});
routes.post("/auth/login", LoginUser);

module.exports = routes;
