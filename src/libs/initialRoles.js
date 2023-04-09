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

const createPermission = async () => {
  try {
    const count = await Permission.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new Permission({ name: "actualizar" }),
      new Permission({ name: "crear" }),
      new Permission({ name: "eliminar" }),
      new Permission({ name: "subir archivo" }),
      new Permission({ name: "descargar archivo" }),
      new Permission({ name: "eliminar archivo" }),
    ]);

    return values;
  } catch (error) {
    next(error);
  }
};

/* un usuario base para superadmin */
/* paises => ciudades */

module.exports = createRoles;
