const mongoose = require("mongoose");
const {
  DB_CONN,
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_PORT,
  DB_URL,
} = require("./variable.env");
const listaDeCategorias = require('../database/BlogValidate/blogValidate')
const listaDeUsuarios = require('../database/UserValidate/userValidate')

const url = `${DB_CONN}+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
const connect = mongoose
  .connect(url || DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
  })
  .then(() => console.log("connected to the database  successfully "))
  .catch((err) => console.log(err));

const disconnectBD = () => {
  mongoose.connection.close();
};

listaDeCategorias();
listaDeUsuarios()

module.exports = {
  connect,
  disconnectBD,
};
