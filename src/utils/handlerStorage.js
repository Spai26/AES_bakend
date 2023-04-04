const multer = require("multer");
const fs = require("fs");
const path = require("path");

/**
 * !TODO: Funcion servira como middleware en caso tenga que subir un archivo al servidor.
 * ? validar subida con es3 - aws
 */

//verifico si existe la carpeta para crearlo

let storageCreated = false;
const storagePath = path.join(__dirname, "src", "storage");

if (!storageCreated && !fs.existsSync(storagePath)) {
  try {
    fs.mkdirSync(storagePath, { recursive: true });
    console.log("La carpeta se creó exitosamente.");
    storageCreated = true;
  } catch (err) {
    console.error("Error al crear la carpeta:", err);
  }
} else {
  console.log("La carpeta ya se ha creado anteriormente 🙂 .");
}

//dirname me da la posicion en la carpeta actual
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathStorage = `${process.cwd()}/src/storage`;
    cb(null, pathStorage);
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    const filename = `${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;
