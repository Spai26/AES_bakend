const TagModel = require('../../database/Tag.model')

const searchTagNameController = async ({name}) => {
   try{
    const result = await TagModel.find({name: {$regex: new RegExp(`${name}`, 'i')}})
    if(result){
      return result    
    }else{
      throw new Error(`No se han encontrado coincidencias`)  
    }
   }catch(err){
    throw new Error(err)
   } 
}   

const allTagsController = async () => {
  try{
    const result = await TagModel.find({})
    if(result.length === 0){
      return `Debe crear nuevos tags`
    }else{
      return result
    }
  }catch(err){
    throw new Error(err)
  }
}

const getTagByIdController = async ({id}) => {
    try{        
     const idTag = await TagModel.findById(id)
     if(idTag){
        return idTag
     }else{
        throw new Error(`No se encontro el tag con ese id`)
     } 
    }catch(err){
     throw new Error(err)
    }
}

const updateTagController = async ({id, name}) => {
   try{
    const esta = await TagModel.findById(id)
    if(esta){
       esta.name = name,
       await esta.save()
       return esta; 
    }else{
      throw new Error(`No se encuentra el id del tag que acaba de ingresar`)  
    }
   }catch(err){
    throw new Error(err)
   } 
}

const deleteTagController = async ({id}) => {
  try{  
    const esta = await TagModel.findOne({_id: id})
    await TagModel.findByIdAndDelete(id)
    if(esta){
        return `Tag con el id: ${id}, eliminado con exito`
    }else{
      return `No se encuentra el tag con ese Id`  
    }
  }catch(err){
    throw new Error(err)
  } 
}

const createTagsController = async ({name}) => {
  try{  
    const result = new TagModel({name: name})
    await result.save()

    if(result){
      return result
    }else{
      throw new Error(`Algo ha salido mal en la creacion del tag`)
    }
  }catch(err){
    throw new Error(err)
  }
}

module.exports = {
    searchTagNameController,
    allTagsController,
    getTagByIdController,
    updateTagController,
    deleteTagController,
    createTagsController
}