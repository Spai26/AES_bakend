const blog = require('../../controllers/Blog/blog.controllers')

const addCategoryToBlog = async (req, res, next) => {
   let {id} = req.params;
   let {category} = req.body;
   
   if(id && category){
    const result = await blog.addCategoryInBlogs({id: id, category: category})
    res.status(200).json(result)
   }else{
    throw new Error(`Faltan campos ! Debe ingresar el slug del Blog y categoria a agregar`)
   }
}

module.exports = addCategoryToBlog