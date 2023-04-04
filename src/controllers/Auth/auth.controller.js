const User = require("../../database/User.model");
const Role = require("../../database/Role.model");
const { createdToken, verifyToken } = require("../../middleware/generateToken");

/**
 * contorlador de login
 * @param {*} email
 * @param {*} password
 * @returns
 */
const validateLogin = async (email, password) => {
  const user = await User.findOne({ email: email });

  if (!user) {
    return "Usuario o email no coincide";
  }

  const validatePassword = await User.comparePassword(password, user.password);

  //401
  if (!validatePassword) {
    return "La contraseña es erronea";
  }
  const token = createdToken(user);

  return token;
};

/**
 * Controlador de registro de usuario
 * @param {*} firstname
 * @param {*} lastname
 * @param {*} username
 * @param {*} email
 * @param {*} password
 * @returns
 */

const registerLogin = async (
  firstname,
  lastname,
  username,
  email,
  password
) => {
  const userExist = await User.findOne({ email: email });
  const validateName = await User.findOne({ username: username });

  if (userExist || validateName) {
    throw new Error("Este usuario ya existe");
  }

  const dataUser = new User({
    firstname,
    lastname,
    username,
    email,
    avatar: `https://ui-avatars.com/api/?name=${firstname}${lastname}`,
    password: await User.encryptPassword(password),
  });

  //asigno un role por defecto
  const role = await Role.findOne({ name: "invitado" });
  dataUser.roles = [role._id];

  dataUser.save();

  const data = {
    token: createdToken(dataUser),
    user: dataUser,
  };

  return data;
};

module.exports = {
  validateLogin,
  registerLogin,
};
