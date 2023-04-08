const { matchedData } = require("express-validator");
const { handlerHttpError } = require("../utils/handlerHttpError");
const {functionMiddlewareNewArray} = require('../middleware/functions')
const  BlogModel  = require("../models/nosql/BlogModel");
const CategoryModel = require('../models/nosql/CategoryModel')
const uploadImage = require("../middleware/generateImage");

/**
 * obtener la lista de blogs
 * @param {*} req
 * @param {*} res
 */
const getItemsBlogs = async (req, res) => {
 try{
   const data = await BlogModel.find({});
   res.send({ data: data });
 } catch(error){
  handlerHttpError(res, `ALGO_HA_SALIDO_MAL`, 404)
 }
}

/**
 * !TODO: crear un blog en nuestro modelo
 * @param {*} req
 * @param {*} res
 * @return newBlog
 */
const createBlog = async (req, res) => {
  const {title, description, image, category} = req.body

  try {
    const newCategoryArray = await functionMiddlewareNewArray({category: category}, (error) => {
      handlerHttpError(res, error)})
    
    const result = new BlogModel({
      title: title,
      description: description,
      image: image,
      category: newCategoryArray
    })
      await result.save()
      res.status(200).json({result})
  } catch (error) {
    handlerHttpError(res, "ERROR_EN_CREATE_BLOG", 400);
  }
}

/**
 * !TODO: obtener blog por medio de un slug o por name
 * @param {*} req
 * @param {*} res
 * @return blogBySlugOrName
 */
const getBlogBySlugOrName = async(req, res) => {
  const {slug} = req.query;
  const {title} = req.query;
  
  if(slug && !title){
    try{
      const result = await BlogModel.findOne({slug: slug}) 
      if(result){
        res.status(200).send({result})
      }else{
        handlerHttpError(res, `NO_SE_HA_ENCONTRADO_EL_BLOG`, 404)
      }
    }catch(error){
      handlerHttpError(res, 'ERROR_EN_BUSQUEDA_POR_SLUG', 400)
    }
  }else{
    try{
      const result = await BlogModel.find({title: {$regex: new RegExp(`${title}`, 'i')}})
      if(result){
        res.status(200).json({result})
      }
    }catch(error){
      handlerHttpError(res, `ERROR_OCURRIDO_EN_PETICION`)
  }
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
    const result = await BlogModel.findById(id)
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
  const result = await BlogModel.findById(id)
  try{
    if(result){
      let ress = await CategoryModel.findOne({name: category})
      if(!ress){
       let newCategory = new CategoryModel({name: category})
       await newCategory.save()     
       result.category.push(category)
       await result.save()
       res.status(200).json({result})
      }
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
    const result = await BlogModel.findById(id)
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
  const {title, description, image, category, status} = req.body;
  
  try{
    const result = await BlogModel.findById(id)
    const newCategoryArray = await functionMiddlewareNewArray({category: category}, (error) => {
      handlerHttpError(res, error)})     

     if(result){
       result.title = title
       result.description = description
       result.image = image
       result.category = newCategoryArray
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
    const result = await BlogModel.delete({_id: id})
    res.status(200).json({result})
  }catch(error){
    handlerHttpError(res, `ERROR_OCURRIDO_EN_LA_PETICION`, 400)
  }
}

module.exports = { 
  getItemsBlogs, 
  createBlog,
  getBlogBySlugOrName,
  getBlogById,
  addCategoryToBlog,
  deleteCategoryToBlog,
  updateBlogById,
  deleteBlogById
}