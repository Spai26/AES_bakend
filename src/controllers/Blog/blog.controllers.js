const Categoria = require("../../database/CategoriasBlog.model");
const Blog = require("../../database/Blog.model");
const uploadImage = require("../../middleware/generateImage");

const User = require("../../database/User.model");

const createNewBlog = async (title, description, image, status, category) => {
  const newPostforBlog = new Blog({
    title,
    description,
    image: await uploadImage(image, { public_id: title }).then(
      (result) => result.url
    ),
    category,
  });

  if (!status) {
    newPostforBlog.status = "desactive";
  } else {
    newPostforBlog.status = status;
  }

  const result = await newPostforBlog.save();
  return result;
};

const getallBlogs = async () => {
  const result = await Blog.find({});

  if (!result.length) {
    throw new Error("Necesitas crear al menos un post");
  }

  return result;
};

/* 
const getBlogforName = async ({ slug }) => {
  const result = await Blog.findOne({
    title: { $regex: new RegExp(`^${slug}$`, "i") },
  });
  return result;
}; */

const updateforName = async ({ slug, title, description, image, status }) => {
  let result = await Blog.findOne({
    title: { $regex: new RegExp(`^${slug}$`, "i") },
  });
  if (result) {
    result.title = title;
    result.description = description;
    result.image = image;
    result.status = status;

    await result.save();
    return result;
  } else {
    throw new Error(`No se encuentra el blog con el nombre: ${slug}`);
  }
};

const addCategoryNameInBlog = async ({ slug, category, titleBlog }) => {
  const blog = await Blog.findOne({
    title: { $regex: new RegExp(`^${titleBlog}$`, "i") },
  });

  if (!blog) {
    throw new Error(`No se encontro el Blog con el titulo: ${titleBlog}`);
  }

  const userr = await User.findOne({
    username: { $regex: new RegExp(`^${slug}$`, "i") },
  });
  if (!userr.blogs.includes(blog._id)) {
    userr.blogs.push(new Blog(blog._id));
    await userr.save();

    throw new Error(
      `Categoria agregada en el modelo usuario con el slug: ${userr.username}`
    );
  }

  const categoria = new Categoria({ name: category });
  await categoria.save();

  blog.categories.push(categoria);
  await blog.save();

  throw new Error(
    `Categoria agregada con exito al modelo blog con el title: ${titleBlog}`
  );
};
/* 
const deleteCategoryToBlog = async ({ slug, category, BlogTitle }) => {
  const categoryDelete = await Categoria.findOne({
    name: { $regex: new RegExp(`^${category}$`, "i") },
  });
  const categoryName = categoryDelete._id;

  let blogg = await Blog.findOne({
    title: { $regex: new RegExp(`^${BlogTitle}$`, "i") },
  });
  let userr = await User.findOne({
    username: { $regex: new RegExp(`^${slug}$`, "i") },
  });

  if (!blogg) {
    throw new Error(`No se ah encontrado el blog con el titulo: ${BlogTitle}`);
  } else {
    if (userr.blogs.some((e) => e.categories === categoryName.toString())) {
      userr.blogs = userr.blogs.filter(
        (e) => !e.categories.toString().includes(categoryName.toString())
      );
      await userr.save();
    }
    blogg.categories = blogg.categories.filter(
      (e) => e.toString() !== categoryName.toString()
    );
    await blogg.save();

    throw new Error(
      `Se ha eliminado correctamente la categoria: ${category}, en el Blog con el title: ${slug}`
    );
 */
const getBlogforName = async (slug) => {
  const findSlug = await Blog.findOne({ slug: slug });
  return findSlug;
  /*  try {
    if (!slug && !title) {
      throw new Error("Debe ingresar un título o un slug");
    }

    if (slug && typeof slug !== "string") {
      throw new Error("El valor de slug no es válido");
    }

    let result;
    if (slug) {
      result = await Blog.find({ slug: slug }).populate("categories");
    } else {
      result = await Blog.find({
        title: { $regex: new RegExp(title, "i") },
      }).populate("categories");
    }

    return result;
  } catch (error) {
    throw new Error(`Error en la búsqueda del blog: ${error.message}`);
  } */
};

const getByIdBlogs = async ({ id }) => {
  const getBlogsId = await Blog.findById({ _id: id }).populate("categories");

  try {
    if (getBlogsId) {
      return getBlogsId;
    } else {
      throw new Error(`Id incorrecto, no se han encontrado resultados`);
    }
  } catch (err) {
    throw new Error(err);
  }
};

const updateforId = async ({ id, title, description, image, status }) => {
  let result = await Blog.findById({ _id: id }).populate("categories");
  if (result) {
    result.title = title;
    result.description = description;
    result.image = image;
    result.status = status;

    await result.save();
    return result;
  } else {
    throw new Error(`No se encuentra el blog con el id: ${id}`);
  }
};

const deleteCategoryToBlog = async ({ id, category }) => {
  let blogg = await Blog.findById({ _id: id }).populate("categories");

  if (!blogg) {
    throw new Error(`No se ha encontrado el blog con el id: ${id}`);
  }

  const categoriesToDelete = blogg.categories.filter((cat) =>
    category.includes(cat.name)
  );

  if (categoriesToDelete.length === 0) {
    throw new Error(
      `Las categorías ${category} no se encuentran en el blog con id ${id}`
    );
  }

  categoriesToDelete.forEach((cat) => {
    blogg.categories = blogg.categories.filter((c) => c._id !== cat._id);
  });

  await blogg.save();

  return `Se han eliminado correctamente las categorías ${category} del blog con id ${id}`;
};

const deleteBlogController = async ({ id }) => {
  try {
    const result = await Blog.findByIdAndDelete({ _id: id });
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

const addCategoryInBlogs = async ({ id, category }) => {
  let categoriesToAdd = [];

  for (let i = 0; i < category.length; i++) {
    const foundCategory = await Categoria.findOne({
      name: { $regex: new RegExp(`^${category[i]}$`, "i") },
    });
    if (foundCategory) {
      categoriesToAdd.push(foundCategory);
    }
  }

  let blogg = await Blog.findOne({ _id: id }).populate("categories");

  try {
    if (categoriesToAdd && blogg) {
      blogg.categories = categoriesToAdd;
      await blogg.save();

      return blogg;
    } else if (!blogg || !categoriesToAdd) {
      throw new Error(`Por favor, valida los campos`);
    }
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  createNewBlog,
  getBlogforName,
  updateforId,
  getallBlogs,

  addCategoryNameInBlog,
  deleteCategoryToBlog,

  getByIdBlogs,
  deleteCategoryToBlog,
  deleteBlogController,
  addCategoryInBlogs,
};
