const {
    searchTagNameController,
    getTagByIdController,
    updateTagController,
    deleteTagController,
    allTagsController,
    createTagsController
} = require('../../controllers/Tags/Tags.controller')

const createTags = async (req, res, next) => {
  const {name} = req.body;

  if(name){
    try{
      const result = await createTagsController({name: name})
      res.status(200).json(result)
    }catch(err){
      next(err)
    }
  }else{
    res.status(400).json(`Debe ingresar el nombre del tag a crear`)
  }
}

const searchTagsHandler = async (req, res, next) => {
   const {name} = req.query;
   
   if(name){
    try{    
      const result = await searchTagNameController({name: name})
      res.status(200).json(result) 
    }catch(err){
        next(err)
    }
   }else{
    try{
      const result = await allTagsController()
      res.status(200).json(result)  
    }catch(err){
        next(err)
    }
   }
}

const getTagsById = async (req, res, next) => {
  const {id} = req.params; 

   if(id){
       try{ 
        const result = await getTagByIdController({id: id})
        res.status(200).json(result)
      }catch(err){
        next(err)
      } 
   }else{
     res.status(400).json(`ERROR_DEBE_INGRESAR_UN_ID`)
   }
}

const updateTag = async (req, res, next) => {
   const {name} = req.body;
   const {id} = req.params

   if(name && id){
     try{
       const result = await updateTagController({id: id, name: name}) 
       res.status(200).json(result)
     }catch(err){
        next(err)
     }
   }else{
    res.status(400).json(`Debe ingresar el nombre del tag a modificar y el id`)
   }
}

const deleteTag = async (req, res, next) => {
    const {id} = req.params;

   if(id){
       try{
         const result = await deleteTagController({id: id})
         res.status(200).json(result)   
       }catch(err){
          next(err) 
       }
   }else{
    res.status(400).json(`Debe ingresar el id del tag a eliminar`)
   } 
}

module.exports = {
    createTags,
    searchTagsHandler,
    getTagsById,
    updateTag,
    deleteTag
}