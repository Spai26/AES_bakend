const {
   getAllFormsController,
   getOrigenController,
   getFormByIdController,
   postNewEspecialistaController,
   postNewOrganizacionesController,
   postNewAlianzasController,
   deleteFormByIdController 
} = require('../../controllers/Form/Form.controller')

const getAllForms = async(req, res, next) => {
  const {origen} = req.query;

    try{
      const result = await getAllFormsController({origen: origen})
      res.status(200).json({result})  
    }catch(err){
        next(err)
    }
}

const getFormById = async (req, res, next) => {
    const {id} = req.params;

   if(id){
       try{    
        const result = await getFormByIdController({id: id})
        res.status(200).json({result})   
       }catch(err){
        next(err)
       }
   } else{
    res.status(400).json({message: `DEBE INGRESAR EL ID, OBLIGATORIAMENTE`})
   }
}

const postNewEspecialista = async (req, res, next) => {
   const {nombre, celular, pais, taller, correo, origen} = req.body;

    try{
      const result = await postNewEspecialistaController({
        nombre: nombre,
        celular: celular,
        pais: pais,
        taller: taller,
        correo: correo,
        origen: origen
      })
      res.status(200).json({result})      
   }catch(err){
    next(err)
   } 
}

const postNewOrganizaciones = async (req, res, next) => {
   const {nombreEmpresa, correo, nombreInstructor, puesto, celular, ciudad, taller, origen} = req.body;
   
   try{ 
    const result = await postNewOrganizacionesController({
        nombreEmpresa: nombreEmpresa,
        correo: correo,
        nombreInstructor: nombreInstructor,
        puesto: puesto,
        celular: celular,
        ciudad: ciudad,
        taller: taller,
        origen: origen
    })
    res.status(200).json({result})
   }catch(err){
    next(err)
   }
}

const postNewAlianzas = async (req, res, next) => {
    const {nombreOrganizacion, mision, nombreInstructor, correo, celular, puesto, cantIntegrantes, ciudad, taller, redesSociales, origen} = req.body;

    try{
      const result = await postNewAlianzasController({
        nombreOrganizacion: nombreOrganizacion,
        mision: mision,
        nombreInstructor: nombreInstructor,
        correo: correo,
        celular: celular,
        puesto: puesto,
        cantIntegrantes: cantIntegrantes,
        ciudad: ciudad,
        taller: taller,
        redesSociales: redesSociales,
        origen: origen
      })  
      res.status(200).json({result})
    }catch(err){
       next(err) 
    }
}

const deleteFormById = async (req, res, next) => {
   const {id} = req.params;
   
   try{
    const result = await deleteFormByIdController({id: id})
    res.status(200).json({result})    
   }catch(err){
    next(err)
   }
}

module.exports = {
    getAllForms,
    getFormById,
    postNewEspecialista,
    postNewOrganizaciones,
    postNewAlianzas,
    deleteFormById
}