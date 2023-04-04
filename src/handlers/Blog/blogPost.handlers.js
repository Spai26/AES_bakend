const BlogController = require("../../controllers/Blog/blog.controllers");

const CreatenewBlog = async (req, res, next) => {
  const { title, description, image } = req.body;

  if (!title || !description || !image) {
    return res.json({
      message: `Por favor ingresa todos los campos requeridos`,
    });
  }

  BlogController.createNewBlog(title, description, image)
    .then((result) => {
      result
        ? res.status(201).json({ message: "Post creado con exito!" })
        : res.status(404).json({
            message: "Verifica los datos requeridos",
          });
    })
    .catch((error) => next(error));
};

module.exports = CreatenewBlog;

