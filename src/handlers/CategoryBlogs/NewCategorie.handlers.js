const BlogCategory = require('../../controllers/BlogCategory/BlogCategory.controllers')

const newCategory = async (req, res, next) => {
   const {category} = req.body;
 
   if(category){
       try{
        const newCategoryy = await BlogCategory.newCategoryInDb({name: category})
        res.status(200).json(newCategoryy)   
       }catch(err){
        next(err)
       }
   }else{
    throw new Error(`Debe ingresar el nombre de la categoria a crear en la base de datos`)
   }
}

module.exports = newCategory