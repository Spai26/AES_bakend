"user strict";

const jwt = require("jsonwebtoken");
const KEY_JWT = "projectaesproduction";

/**
 * pasar el objeto del usuario creado
 * @param {*} user
 * @returns  token
 */
const createdToken = (user) => {
  const token = jwt.sign({ id: user._id, role: user.roles }, KEY_JWT, {
    expiresIn: "30d",
  });

  return token;
};

/**
 * pasa el token de sesion
 * @param {*} tokenasign
 * @returns tokenverificado
 */
const verifyToken = async (tokenasign) => {
  try {
    return jwt.verify(tokenasign, KEY_JWT);
  } catch (error) {
    return null;
  }
};

const decodeSign = (token) => {
  return jwt.decode(token, null);
};
module.exports = { createdToken, verifyToken, decodeSign };
