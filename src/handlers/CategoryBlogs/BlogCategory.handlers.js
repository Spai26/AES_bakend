const BlogCategory = require('../../controllers/BlogCategory/BlogCategory.controllers')

const getAllCategory = async (req, res, next) => {
    try{    
      const all = await BlogCategory.allCategoryController()
      res.status(200).json(all)  
    }catch(err){
       next(err) 
    }
}

module.exports = getAllCategory