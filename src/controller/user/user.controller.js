const { matchedData } = require("express-validator");
const { user } = require("../../models/");
const handlerHttpError = require("../../utils/handlerHttpError");
const { isExist } = require("../../libs/findUser");

/**
 * !TODO: obtener la lista de usuarios sin roles, blog y passwords
 
 */
const getAllItems = async (req, res) => {
  try {
    const data = await user
      .find({}, { password: 0, blogs: 0 })
      .populate("roles", "name")
      .exec();

    if (!data.length) {
      handlerHttpError(res, "No hay usuarios creados", 204);
      return;
    }

    res.send(data);
  } catch (error) {
    handlerHttpError(res, "ERROR al traer data", 400);
  }
};

/**
 * !TODO: Controlador para creacion de usuario
 */
const createUser = async (req, res) => {
  try {
    const { email, roles, ...body } = matchedData(req);
    /* console.log(roles); */
    const data = new user({
      firstname: body.firstname,
      lastname: body.lastname,
      email: email,
      password: await user.encryptPassword(body.password),
      roles: body.roles,
      avatar: `https://ui-avatars.com/api/?name=${body.firstname}${body.lastname}`,
    });

    const result = await data.save();
    res.status(201).json(result);
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
    const result = await user.findById(id);

    res.status(200).json(result);
  } catch (error) {
    handlerHttpError(res, "Este registro no existe", 400);
  }
};

/**
 * !TODO: controlador actualizar usuario
 
 */
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, password, avatar, roles } = req.body;
    console.log(req.body);

    const isExist = await user.findOne({ _id: id });

    if (isExist) {
      handlerHttpError(res, "Usuario no existe", 404);
    }

    const compare = await user.comparePassword(isExist.password, password);

    console.log(compare);

    /* const data = await user.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          firstname: body.firstname,
          lastname: body.lastname,
          email: email,
          roles: body.roles,
          avatar: `https://ui-avatars.com/api/?name=${body.firstname}${body.lastname}`,
        },
      }
    );

    if (password) {
      const newpass = user.comparePassword(password);
    } */

    /* console.log(data) */
    res.status(202).json({ message: "usuario actualizado!" });
  } catch (error) {
    handlerHttpError(res, "No se acepta campos vacios", 400);
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
