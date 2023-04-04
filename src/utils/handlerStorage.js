const multer = require("multer");
const fs = require("fs");

/**
 * !TODO: Funcion servira como middleware en caso tenga que subir un archivo al servidor.
 * ? validar subida con es3 - aws
 */

//verifico si existe la carpeta para crearlo
const verific_Path = fs.existsSync("./storage");

if (!verific_Path) {
  fs.mkdirSync("./storage");
}

//dirname me da la posicion en la carpeta actual
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathStorage = `${__dirname}/../Storage`;
    cb(null, pathStorage);
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    const filename = `file.${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;
