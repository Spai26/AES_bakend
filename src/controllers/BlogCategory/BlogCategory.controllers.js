const Category = require('../../database/CategoriasBlog.model')

const allCategoryController = async () => {
    const allCategories = await Category.find({})
    return allCategories
}

const newCategoryInDb = async ({name}) => {
   const reviews = await Category.findOne({name: { $regex: new RegExp(`^${name}$`, 'i')}}) 

   if(!reviews){
     const postCategory = new Category({
        name: name
     })

     await postCategory.save()
     return postCategory
   }else{
    throw new Error(`La categoria: ${name}, ya existe en la Base de datos, por favor crea una distinta`)
   }    
}

const modificCategoryToDb = async ({slug, category}) => {
  const estaEnLaDb = await Category.findOne({name: { $regex: new RegExp(`^${slug}$`, 'i')}})

  if(estaEnLaDb){
    estaEnLaDb.name = category
    await estaEnLaDb.save()
    return estaEnLaDb;
  }else{
    throw new Error(`Lo sentimos, la categoria que intentas modificar no se encuentra en la base de datos`)
  }
}

const deleteCategoryById = async ({id}) => {
  const selectIdCategory = await Category.findByIdAndDelete({_id: id})
  try{
    if(selectIdCategory){
      return selectIdCategory
    }else{
      throw new Error(`No se encontro la categoria con el id: ${id} en la base de datos`)
    }
  }catch(err){
    throw new Error(err)
  }
}

module.exports = {
    allCategoryController,
    newCategoryInDb,
    modificCategoryToDb,
    deleteCategoryById
}