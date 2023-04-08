const BlogCategory = require('../../controllers/BlogCategory/BlogCategory.controllers')

const modificCategory = async (req, res, next) => {
    const {category} = req.body;
    const {slug} = req.query

   if(slug && category){
    try{
      const modific = await BlogCategory.modificCategoryToDb({category: category, slug: slug})
      res.status(200).json(modific)    
    }catch(err){
      next(err)
    }
   }else{
    throw new Error(`Debe ingresar los datos que se le piden, slug de la categoria y category a agregar`)
   }
}

module.exports = modificCategory