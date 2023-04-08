const BlogController = require("../../controllers/Blog/blog.controllers");

//crear un nuevo post - blog
const createNewBlog = async (req, res, next) => {
  const { title, description, image, status, category, tags } = req.body;

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
      category,
      tags
    );
    result
      ? res.status(200).json({ message: "Post creado" })
      : res.status(500).json({ message: "Haz ingresado datos no valido" });
  } catch (error) {
    next(error);
  }
};

//detalle de post - blog
const getBlogBySlug = async (req, res, next) => {
  const { slug } = req.query;
  try {
    const result = await BlogController.getBlogBySlug(slug);
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "ERROR_SLUG_NO_VALIDO" });
  }
}

const getById = async (req, res, next) => {
  const { id } = req.params;

  if (id) {
    try {
      const result = await BlogController.getByBlogId({ id: id });
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
  const { title, description, image, category, status, tags } = req.body;

  try {
    const result = await BlogController.updateforId({
      id: id,
      title: title,
      description: description,
      image: image,
      status: status,
      category: category,
      tags: tags
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const addTagToBlog = async (req, res, next) => {
  const {name} = req.body;
  const {id} = req.params;

  if(name && id){
    try{
      const result = await BlogController.addTagController({id: id, name: name})
      res.status(200).json(result)
    }catch(err){
      next(err)
    }
  }else{
    res.status(400).json(`Debe ingresar el id y nombre de tags`)
  }
}

const deleteTagInBlog = async ( req, res, next ) => {
  const {id} = req.params;
  const {name} = req.body;

  if(name && id){
    try{
      const result = await BlogController.deleteTagInBlogController({id: id, name: name})
      res.status(200).json(result)
    }catch(err){
      next(err)
    }
  }else{
    res.status(400).json(`Debe pasar todos los campos`)
  }
}

module.exports = {
  createNewBlog,
  getBlogBySlug,
  updateBlogbyId,
  getById,
  addTagToBlog,
  deleteTagInBlog
};
