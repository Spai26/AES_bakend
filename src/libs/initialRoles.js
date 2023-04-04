const Role = require("../database/Role.model");

const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new Role({ name: "admin" }),
      new Role({ name: "invitado" }),
      new Role({ name: "moderador" }),
    ]);

    return values;
  } catch (error) {
    next(error);
  }
};

module.exports = createRoles;
