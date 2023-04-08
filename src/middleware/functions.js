const CategoryModel = require('../database/CategoriasBlog.model')
const TagsModel = require('../database/Tag.model')

const functionMiddlewareNewArray = async ({category}) => {
   try {
    const newCategory = []; 
     for(let i=0; i<category.length; i++){    
      let ress = await CategoryModel.findOne({name: category[i]})
      if(ress){
        if(!newCategory.includes(ress.name)){ // Verificar si la categoría ya está en la matriz newCategory
          newCategory.push(ress.name);
        }
       } else {
        let saveCategory = new CategoryModel({name: category[i]})
        await saveCategory.save()

         if(!newCategory.includes(category[i])){ // Verificar si la categoría ya está en la matriz newCategory
          newCategory.push(category[i]);
         }
        }
       }     
      return newCategory
    }catch(error) {
        throw new Error(`ERROR_OCURRIDO_IN_MIDDLEWARE`, error)
    } 
 }

const functionMiddlewareTags = async ({name}) => {
  try{
   const newArray = []
   
   for(let i = 0; i<name.length; i++){
    let esta = await TagsModel.findOne({name: name[i]})
    if(esta){
      if(!newArray.includes(esta.name)){ // Verificar si el tag ya está en la matriz newArray
        newArray.push(esta.name);
      }
    }else{
      let saveTag = new TagsModel({name: name[i]})
      await saveTag.save()
      if(!newArray.includes(name[i])){
        newArray.push(name[i])
      }
    }
   }
   return newArray
  }catch(err){
    throw new Error(`ERROR_OCURRIDO_IN_MIDDLEWARE_TAG`, err)
  }
}

module.exports = {
    functionMiddlewareNewArray,
    functionMiddlewareTags 
}