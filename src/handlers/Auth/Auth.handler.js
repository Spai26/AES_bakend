const AuthController = require("../../controllers/Auth/auth.controller");

//logueo de usuario
const LoginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const result = await AuthController.validateLogin(email, password);

  res.header("auth_token", result).json({ data: result });
};

//registro de usuario
const RegisterUser = async (req, res, next) => {
  const { firstname, lastname, username, email, password, roles, avatar } =
    req.body;
  try {
    if (!firstname || !lastname || !username || !email || !password) {
      return res.json({
        message: "Por favor ingresa todos los campos requeridos",
      });
    }

    const result = await AuthController.registerLogin(
      firstname,
      lastname,
      username,
      email,
      password,
      roles,
      avatar
    );

    result
      ? res.status(200).json({ message: `Usuario creado!` })
      : res.status(404).json({ message: "Completa los campos requeridos" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  LoginUser,
  RegisterUser,
};
