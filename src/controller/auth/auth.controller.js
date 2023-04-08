const { user } = require("../../models");
const { createdToken } = require("../../middleware/generateToken");
const handlerHttpError = require("../../utils/handlerHttpError");

const authLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isExits = await user.findOne({ email: email });

    if (!isExits) {
      handlerHttpError(res, "Usuario o email no coincide", 400);
      return;
    }

    const validatePassword = await user.comparePassword(
      password,
      isExits.password
    );

    //401
    if (!validatePassword) {
      handlerHttpError(res, "La contraseña es erronea", 406);
      return;
    }
    const token = createdToken(isExits);

    res.cookie("token", token);
    res.status(202).json({ succes: true });
  } catch (error) {
    handlerHttpError(res, "Datos incorrectos", 400);
  }
};
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
};
 */
module.exports = {
  authLogin,
  /*  registerLogin, */
};
