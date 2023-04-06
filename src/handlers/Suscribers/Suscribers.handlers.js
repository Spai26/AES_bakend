const {
   getAllSuscribersByNameController,
   getAllController,
   postSuscribersController,
   updateSuscribersController,
   deleteSuscribersController
} = require('../../controllers/Suscribers/Suscribers.controller')

const getAllSuscribers = async (req, res, next) => {
  const {name} = req.query;

  if(name!==null && name!==undefined){
    try{
      const result = await getAllSuscribersByNameController({name: name})
      res.status(200).json(result)  
    }catch(err){
     next(err);
    }
  }else{
    try{        
      const result = await getAllController() 
      res.status(200).json(result) 
    }catch(err){
      next(err)  
    }
  }
}

const postNewSuscribers = async (req, res, next) => {
    const {nombre, correo, notificaciones} = req.body;

    if(nombre && correo || notificaciones){
        try{
          const result = await postSuscribersController({
            nombre: nombre,
            correo: correo,
            notificaciones: notificaciones
          })  
          res.status(200).json(result)
        }catch(err){
            next(err)
        }
    }else{
       res.status(500).json(`Debe ingresar los campos requeridos`) 
    }
}

const updateSuscribers = async (req, res, next) => {
    const {nombre, correo, notificaciones, status} = req.body;
    const {id} = req.params;

    if(id!==null && id!==undefined || nombre || correo ||  notificaciones || status){
      try{
        const result = await updateSuscribersController({
          id: id,  
          nombre: nombre,
          correo: correo,
          notificaciones: notificaciones,
          status: status
        })
        res.status(200).json(result)
      }catch(err){
        next(err)
      }  
    }else{
       res.status(500).json(`Debe ingresar los campos validos y el id es obligatorio`) 
    }
}   

const deleteSuscribers = async (req, res, next) => {
  const {id} = req.params;
  
  if(id){   
    try{
       const result = await deleteSuscribersController({id: id})
       res.status(200).json(result)
    }catch(err){
       next(err) 
    }
  }else{
    throw new Error(`Debe inf¿gresar un id a eliminar`)
  }
}

module.exports = {
    getAllSuscribers,
    postNewSuscribers,
    updateSuscribers,
    deleteSuscribers
}