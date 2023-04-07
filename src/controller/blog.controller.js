const { matchedData } = require("express-validator");
const { handlerHttpError } = require("../utils/handlerHttpError");
const  BlogTest  = require("../models/nosql/BlogTest");
const uploadImage = require("../middleware/generateImage");

/**
 * obtener la lista de blogs
 * @param {*} req
 * @param {*} res
 */
const getItemsBlogs = async (req, res) => {
 try{
   const data = await BlogTest.find({});
   res.send({ data: data });
 } catch(error){
  handlerHttpError(res, `ALGO_HA_SALIDO_MAL`, 404)
 }
};

/**
 * !TODO: crear un blog en nuestro modelo
 * @param {*} req
 * @param {*} res
 * @return newBlog
 */
const createBlog = async (req, res) => {
  const {title, description, image} = req.body
  try {
    // const bodyData = matchedData(body)
    const result = new BlogTest({
      title: title,
      description: description,
      image: image
    })
    await result.save()
    res.status(200).json(result);
  } catch (error) {
    handlerHttpError(res, "ERROR_FN_CREATEBLOG");
  }
};

/**
 * !TODO: obtener blog por medio de un slug
 * @param {*} req
 * @param {*} res
 * @return blogBySlug
 */
const getBlogBySlug = async(req, res) => {
  try{
    const {slug} = req.query;
    const result = await BlogTest.findOne({slug: slug})

    if(result){
      res.status(200).send({result})
    }else{
      handlerHttpError(res, `NO_SE_HA_ENCONTRADO_EL_BLOG`, 404)
    }
  }catch(error){
    handlerHttpError(res, 'ERROR_EN_BUSQUEDA_POR_SLUG', 400)
  }
}

/**
 * !TODO: traer un blog por su nombre
 * @param {*} req 
 * @param {*} res
 */
const getBlogByName = async (req, res) => {
  const {name} = req.query;

  try{
    const result = await BlogTest.find({name: {$regex: new RegExp(`${name}`, 'i')}})
    if(result){
      res.status(200).json({result})
    }
  }catch(error){
    handlerHttpError(res, `ERROR_OCURRIDO_EN_PETICION`)
  }
}

/**
 * !TODO: traer un blog por su id
 * @param {*} req
 * @param {*} res
 */
const getBlogById = async (req, res) => {
  const {id} = req.params;

  try{
    const result = await BlogTest.findById(id)
    res.status(200).json({result})
  }catch(error){
    handlerHttpError(res, `ERROR_OCURRIDO_EN_LA_PETICION`, 400)
  }
}

/**
 * !TODO: agregar una categoria a un blog
 * @param {*} req
 * @param {*} res
 * @return createdBlog
 */
const addCategoryToBlog = async (req, res) => {
  const {id} = req.params
  const {category} = req.body;
  const result = await BlogTest.findById(id)
  try{
    if(result){
      //implementar logica para que a su vez se guarde en la db de categorias
      result.category.push(category)
      await result.save()

      res.status(200).json({result});
    }else{
      handlerHttpError(res, `ERROR_NO_SE_ENCONTRO_ESE_ID`, 404)
    }
  }catch(error){
    handlerHttpError(res, `ERROR_ALGO_SALIO_MAL_EN_LA_PETICION`, 400)
  }
}

/**
 * !TODO: eliminar una categoria del array
 * @param {*} req 
 * @param {*} res
 * @return deleteCategoryInBlog 
 */
const deleteCategoryToBlog = async (req, res) => {
  const {id} = req.params;
  const {category} = req.body;
  
  try{
    const result = await BlogTest.findById(id)
    if(result){
      result.category = result.category.filter((e) => e !== category)
      await result.save()
      res.status(200).json({message: `Categoria eliminada con exito`})
    }else{
      handlerHttpError(res, `ERROR_NO_SE_ENCONTRO_EL_ID`, 404)
    } 
  }catch(error){
    handlerHttpError(res, `ERROR_ALGO_SALIO_MAL_EN_LA_PETICION`, 400)
  }
}

/**
 * !TODO: actualizar datos del blog
 * @param {*} req 
 * @param {*} res
 * @return updateBlog 
 */
const updateBlogById = async (req, res) => {
  const {id} = req.params;
  const {title, description, image, status} = req.body;
  const result = await BlogTest.findById(id)

   try{
     console.log(result)
     if(result){
       result.title = title
       result.description = description
       result.image = image
       result.status = status
 
       await result.save()
       res.status(201).json({result})
     }
   }catch(error){
     handlerHttpError(res, `ERROR_OCURRIDO_EN_LA_PETICION`, 400)
   }
}   

/**
 * !TODO: eliminar un blog por id
 * @param {*} req 
 * @param {*} res 
 */
const deleteBlogById = async (req, res) => {
  const {id} = req.params;

  try{
    const result = await BlogTest.delete({_id: id})
    res.status(200).json({result})
  }catch(error){
    handlerHttpError(res, `ERROR_OCURRIDO_EN_LA_PETICION`, 400)
  }
}

module.exports = { 
  getItemsBlogs, 
  createBlog,
  getBlogByName,
  getBlogBySlug,
  getBlogById,
  addCategoryToBlog,
  deleteCategoryToBlog,
  updateBlogById,
  deleteBlogById
}