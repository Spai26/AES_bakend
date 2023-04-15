const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new Role({ name: "superadmin" }),
      new Role({ name: "admin" }),
      new Role({ name: "editor" }),
    ]);

    return values;
  } catch (error) {
    next(error);
  }
};

/* un usuario base para superadmin */
/* paises => ciudades */

module.exports = createRoles;
