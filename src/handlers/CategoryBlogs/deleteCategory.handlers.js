const BlogCategory = require('../../controllers/BlogCategory/BlogCategory.controllers')

const deleteCategory = async (req, res, next) => {
   const {id} = req.params 

   if(id){
     try{
       const result = BlogCategory.deleteCategoryById({id: id})
       res.status(200).json(result) 
     }catch(err){
       next(err)
     }
   }else{
    throw new Error(`Debe ingresar el id de una categoria existente en la base de datos`)
   }
}

module.exports = deleteCategory