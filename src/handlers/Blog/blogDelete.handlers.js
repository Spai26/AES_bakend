const {deleteBlogController} = require('../../controllers/Blog/blog.controllers')

const deleteBlog = async (req, res, next) => {  
    const {id} = req.params;
    try{
      const deleteBlogg = await deleteBlogController({id: id})
      res.status(200).json(deleteBlogg)  
    }catch(err){
      next(err)  
    }
}

module.exports = deleteBlog