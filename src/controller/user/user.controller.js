const { matchedData } = require("express-validator");
const { user } = require("../../models/");
const handlerHttpError = require("../../utils/handlerHttpError");
const { validExtensionImage } = require("../../libs/validExtensionFiles");

/**
 * !TODO: obtener la lista de usuarios sin roles, blog y passwords
 
 */
const getAllItems = async (req, res) => {
  try {
    const data = await user
      .find({}, { password: 0 })
      .populate("roles", "name")
      .exec();

    if (!data.length) {
      return handlerHttpError(res, "No hay usuarios creados", 204);
    }

    res.status(200).json(data);
  } catch (error) {
    handlerHttpError(res, "error al traer data", 500);
  }
};

/**
 * !TODO: Controlador para creacion de usuario
 */
const createUser = async (req, res) => {
  try {
    const { email, roles, avatar, ...body } = matchedData(req);

    if (!validExtensionImage(avatar)) {
      return handlerHttpError(res, "Solo se acepta ext. jpg. png. .gif");
    }

    const data = new user({
      firstname: body.firstname,
      lastname: body.lastname,
      email: email,
      password: await user.encryptPassword(body.password),
      roles: roles,
      avatar: avatar,
    });

    await data.save();
    res.status(201).json({ message: "Usuario creado!" });
  } catch (error) {
    console.error(error);
    handlerHttpError(res, "Error al crear o email duplicado", 400);
  }
};

/**
 * !TODO: Controlador para el detalle del usuario
 */
const detailUser = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const result = await user.findById(id, {
      roles: 0,
      password: 0,
      last_login: 0,
    });

    res.status(200).json(result);
  } catch (error) {
    handlerHttpError(res, "Este registro no existe", 400);
  }
};

/**
 * !TODO: controlador actualizar usuario
 */
const updateUser = async (req, res) => {
  const { id } = req.params;
  let up = req.body;
  try {
    const isExist = await user.findOne({ _id: id });

    if (!isExist) {
      return handlerHttpError(res, "Exte usuario no existe", 400);
    }

    await user.updateOne(
      { _id: id },
      {
        $set: {
          firstname: up.firstname,
          lastname: up.lastname,
          avatar: up.avatar,
          status: up.status,
        },
      }
    );

    res.status(202).json({ succes: true });
  } catch (error) {
    console.error(error);
    handlerHttpError(res, "Algo inesperado sucedio!", 500);
  }
};

/**
 * !TODO: Eliminar un usuario diferente de superamin y admin
 */
const deleteUser = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const isExist = await user.findOne({ _id: id });

    if (!isExist) {
      handlerHttpError(res, "No se encontro el usuario", 400);
      return;
    }

    const data = await user.delete({ _id: id });
    /* console.log(data); */
    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    handlerHttpError(res, "Haz ingresado un id no valido", 400);
  }
};

module.exports = {
  getAllItems,
  createUser,
  detailUser,
  deleteUser,
  updateUser,
};
