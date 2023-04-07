const { handlerHttpError } = require("../utils/handlerHttpError");
const CategoryModel = require('../models/nosql/CategoryModel')

/**
 * !TODO: obtener todas las categorias
 * @param {*} req
 * @param {*} res
 */
const getAllCategory = async (req, res) => {
  const {nombre} = req.query;

  if(nombre){
    try{
      const result = await CategoryModel.find({name: {$regex: new RegExp(`${nombre}`, 'i')}})
      if(result.length>0){
        res.status(200).json({result})
      }else{
        handlerHttpError(res, `ERROR_NO_EXISTE_COINCIDENCIAS_DE_CATEGORIAS_CON_ESE_NOMBRE`, 404)
      }
    }catch(error){
      handlerHttpError(res, `ERROR_OCURRIDO_EN_LA_PETICION`, 400)
    }
  }else{
    try{
     const result = await CategoryModel.find({})
     res.status(200).json({result})
    }catch(error){
     handlerHttpError(res, `ERROR_OCURRIDO_EN_LA_PETICION`, 400)
    }     
  }
}


/**
 * !TODO: crear una nueva categoria
 * @param {*} req
 * @param {*} res
 * @return newCategory
 */
const newCategory = async (req, res) => {
    const {categoria} = req.body;

    try{
      const result = new CategoryModel({name: categoria}) 
      await result.save()
      
      res.status(200).json({result})
    }catch(error){
        handlerHttpError(res, `ERROR_OCURRIDO_EN_LA_PETICION`, 400)
    }
}

/**
 * @param {*} req
 * @param {*} res
 * @return updateCategory
 */
const updateCategory = async (req, res) => {
  const {id} = req.params;
  const {categoria} = req.body;
  
  try{
    const result = await CategoryModel.findById(id)
    
    if(result.name !== categoria){
      result.name = categoria
      await result.save(result)
      
      res.status(200).json({result})
    }else{
      handlerHttpError(res, `ERROR_CATEGORIA_YA_EXISTE_EN_LA_DB`, 400)
    }
  }catch(error){
    handlerHttpError(res, `ERROR_OCURRIDO_EN_LA_PETICION`, 400)
  }
}

/**
 * @param {*} req
 * @param {*} res
 */
const deleteCategory = async (req, res) => {
   const {id} = req.params;
   
   try{
    await CategoryModel.findByIdAndDelete(id)
    res.status(200).json({message: `CATEGORIA:CON_EL_ID: ${id}, ELIMINADA_CON_EXITO_DE_LA_DB`})
   }catch(error){
    handlerHttpError(res, `ERROR_OCURRIDO_EN_LA_PETICION`, 400)
   }
}

module.exports = {
    getAllCategory,
    newCategory,
    updateCategory,
    deleteCategory
}