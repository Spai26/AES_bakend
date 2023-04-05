const BlogController = require("../../controllers/Blog/blog.controllers");

//crear un nuevo post - blog
const createNewBlog = async (req, res, next) => {
  const { title, description, image, status, category } = req.body;

  if (!title || !description || !image || !category) {
    return res.json({
      message: `Por favor ingresa todos los campos requeridos`,
    });
  }
  try {
    const result = BlogController.createNewBlog(
      title,
      description,
      image,
      status,
      category
    );
    result
      ? res.status(200).json({ message: "Post creado" })
      : res.status(500).json({ message: "Haz ingresado datos no valido" });
  } catch (error) {
    next(error);
  }
};

//detalle de post - blog
const getBlogByName = async (req, res, next) => {
  const { slug } = req.query;
  try {
    const result = await BlogController.getBlogforName(slug);
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "ERROR_SLUG_NO_VALIDO" });
  }

  
};

const getById = async (req, res, next) => {
  const { blogId } = req.params;

  if (blogId) {
    try {
      const result = await BlogController.getByIdBlogs({ id: blogId });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  } else {
    throw new Error(`Debe ingresar un id`);
  }
};

//actualizar post - blog
const updateBlogbyId = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, image, status } = req.body;

  try {
    const result = await BlogController.updateforId({
      id: id,
      title: title,
      description: description,
      image: image,
      status: status,
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewBlog,
  getBlogByName,
  updateBlogbyId,
  getById,
};
