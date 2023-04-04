const Controller = require('../../controllers/Blog/blog.controllers')

const deleteCategoriaInBlog = async (req, res, next) => {
    let {id} = req.params;
       let {category} = req.body;
       
       if(id!==null && category!==null ){
        try{    
          const deleteCategory = await Controller.deleteCategoryToBlog({id: id, category: category})
          res.status(200).json(deleteCategory)  
        }catch(err){
           next(err) 
        }
       }else{
        throw new Error('Debe ingresar slug del blog y category a eliminar');
       }
}

module.exports = deleteCategoriaInBlog