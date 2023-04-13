const { user } = require("../../models");
const { createdToken } = require("../../middleware/generateToken");
const handlerHttpError = require("../../utils/handlerHttpError");
const { matchedData } = require("express-validator");

const authLogin = async (req, res) => {
  req = matchedData(req);
  const { email, password } = req;

  try {
    const isExits = await user.findOne({ email: email });

    if (!isExits) {
      return handlerHttpError(res, "Usuario o email no coincide", 404);
    }

    const validatePassword = await user.comparePassword(
      password,
      isExits.password
    );

    //401
    if (!validatePassword) {
      return handlerHttpError(res, "La contraseña es erronea", 404);
    }

    const token = createdToken(isExits);

    res.cookie("login", token);
    res
      .status(202)
      .json({ success: true, token, id: isExits._id, role: isExist.roles });
  } catch (error) {
    handlerHttpError(res, "Datos incorrectos", 400);
  }
};

const logOut = (req, res) => {
  res.cookie("token", "").json({ success: false });
};

const changePassword = (req, res) => {};
/* 
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
}; */

module.exports = {
  authLogin,
  logOut,
  changePassword,
  /*  registerLogin, */
};
