const Blog = require("../../database/Blog.model")
const uploadImage = require("../../middleware/generateImage");
const {
  functionMiddlewareNewArray,
  functionMiddlewareTags
} = require('../../middleware/functions')

const createNewBlog = async (title, description, image, status, category, tags) => {
  try{
    const newArrayCategory = await functionMiddlewareNewArray({category: category})
    const newArrayTags = await functionMiddlewareTags({name: tags}) 

    const newPostforBlog = new Blog({
      title,
      description, 
      image: await uploadImage(image, { public_id: title }).then(
        (result) => result.url
      ), 
      category: newArrayCategory,
      tags: newArrayTags
    })
    if (!status) {
      newPostforBlog.status = "desactive"
    } else {
      newPostforBlog.status = status
    } 
    const result = await newPostforBlog.save()
    return result
  }catch(err){
    console.error(err)
  }
}

const getallBlogs = async () => {
  const result = await Blog.find({})
  if (!result.length) {
    throw new Error("Necesitas crear al menos un post")
  }
  return result
}

const updateforId = async ({ id, title, description, image, status, category, tags}) => {
 try{
  const result = await Blog.findById(id)
  const newArray = await functionMiddlewareNewArray({category: category})
  const newArrayTags = await functionMiddlewareTags({name: tags})

   if (result) {
     result.title = title
     result.description = description
     result.image = image
     result.status = status
     result.category = newArray
     result.tags = newArrayTags 
     await result.save()
     return result
   } else {
     throw new Error(`No se encuentra el blog con el id: ${id}`)
   }
 }catch(err){
  throw new Error(err)
 }; 
}

const addCategoryInBlog = async ({ id, category}) => {
  try{
    const blog = await Blog.findById(id)
     if (!blog) {
      throw new Error(`No se encontro el Blog con el id: ${id}`);
     }else{
      let newArray = await functionMiddlewareNewArray({category: category})

      for(let i=0; i<newArray.length; i++){
        blog.category.push(newArray[i])
      }
      await blog.save()
      return blog
    }
  }catch(err){
    throw new Error(err)
  }
}

const getBlogBySlug = async (slug) => {
  const findSlug = await Blog.findOne({ slug: slug })
  return findSlug
}

const getByBlogId = async ({ id }) => {
  try {
  const getBlogsId = await Blog.findById(id)
    if (getBlogsId) {
      return getBlogsId
    } else {
      throw new Error(`Id incorrecto, no se han encontrado resultados`)
    }
  } catch (err) {
    throw new Error(err)
  }
};

const deleteCategoryToBlog = async ({ id, category }) => {
  let blogg = await Blog.findById(id)

  if (!blogg) {
    throw new Error(`No se ha encontrado el blog con el id: ${id}`)
  }
  blogg.category = blogg.category.filter((e) => !category.includes(e))
  await blogg.save()
  return `Se han eliminado correctamente las categorías ${category} del blog con id ${id}`
};

const deleteBlogController = async ({ id }) => {
  try {
    const result = await Blog.findByIdAndDelete(id)
    return result
  } catch (err) {
    throw new Error(err)
  }
};

const addTagController = async ({id, name}) => {
  try{
    const blogg = await Blog.findById(id)

    if(blogg){
      const newArrayTag = await functionMiddlewareTags({name: name})
      
      for(let i=0; i<newArrayTag.length; i++){
        blogg.tags.push(newArrayTag[i])
      }

      await blogg.save()
      return blogg
    }else{
      throw new Error(`No se ha encontrado el blog con ese id`)
    }
  }catch(err){
    throw new Error(err)
  }
}

const deleteTagInBlogController = async ({id, name}) => {
  try{
    let esta = await Blog.findById(id)

    if(esta){
      esta.tags = esta.tags.filter((e) => !name.includes(e))
      await esta.save()
      return `Se han eliminado correctamente los tags ${name} del blog con id ${id}`
    }else{
      throw new Error(`No se ha encontrado el blog con ese id`)
    }
  }catch(err){
    throw new Error(err)
  }
}

module.exports = {
  createNewBlog,  
  updateforId,
  getallBlogs,
  getByBlogId,
  getBlogBySlug,
  deleteCategoryToBlog,
  addCategoryInBlog,
  deleteBlogController,
  addTagController,
  deleteTagInBlogController
}