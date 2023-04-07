const { handlerHttpError } = require("../utils/handlerHttpError");
const FormModel = require('../models/nosql/FormModel')

/**
 * TODO! traer todos los formularios
 * @param {*} req
 * @param {*} res
 * @return allForms
 */
const getAllForms = async (req, res) => {
    try{    
        const result = await FormModel.find({})
        res.status(200).json({result})  
    }catch(error){
        handlerHttpError(res, `ERROR_OCURRIDO_EN_LA_PETICION`, 400)
    }
}

/**
 * !TODO: traer formulario por su id
 * @param {*} req
 * @param {*} res
 * @return formId
 */
const getFormById = async (req, res) => {
    const {id} = req.params;

    try{
      const result = await FormModel.findById(id)
      
      if(result){
        res.status(200).json({result})
      }else{
        handlerHttpError(res, `ERROR_NO_SE_ENCONTRO_EL_ID: ${id}`, 404)
      }
    }catch(error){
        handlerHttpError(res, `ERROR_OCURRIDO_EN_LA_PETICION`, 400)
    }
}

/**
 * !TODO: nuevo usuario de tipo especialista
 * @param {*} req
 * @param {*} res
 * @return newEspecialista
 */
const newSpecialist = async (req, res) => {
  const {nombre, celular, pais, taller, correo, origen} = req.body;
  
  if(origen === "Especialista"){
      const result = await FormModel.findOne({email: correo, origin: origen})
      
      if(!result || result && result.origin !== origen){
        const ress = new FormModel({
            name: nombre,
            phone: celular,
            country: pais,
            workShop: taller,
            email: correo,
            origin: origen
        })
        await ress.save()

        res.status(200).json({ress})
      }else{
        handlerHttpError(res, `ERROR_EL_USUARIO_CON_ESE_ORIGEN_YA_EXISTE`, 400)
      }   
  }else{
    handlerHttpError(res, `ERROR_ORIGEN_DEBE_SER: "Especialista"`, 400)
  }
}

/**
 * !TODO: nuevo usuario de tipo organizacion en la db
 * @param {*} req 
 * @param {*} res 
 * @return newOrganization
 */
const newOrganization = async (req, res) => {
  const {nombreEmpresa, correo, nombreInstructor, puesto, celular, ciudad, taller, origen} = req.body;

  if(origen === "Organizaciones"){
   try{
     const result = await FormModel.findOne({email: correo, origin: origen})
     if(!result || result && result.origin !== origen){
       const ress = new FormModel({
         nameCompany: nombreEmpresa,
         email: correo,
         nameInstructor: nombreInstructor,
         position: puesto,
         phone: celular,
         city: ciudad,
         workShop: taller,
         origin: origen
       })
       await ress.save()
 
       res.status(200).json({ress})
     }else{
       handlerHttpError(res, `ERROR_EL_USUARIO_CON_ESE_ORIGEN_YA_EXISTE`, 400)
     }
   }catch(error){
    handlerHttpError(res, `ERROR_EN_LA_PETICION`, 400)
   }
  }else{
    handlerHttpError(res, `ERROR_EL_ORIGEN_DEBE_SER: "Organizaciones"`, 400)
  }
}

/**
 * !TODO: creo un nuevo usuario de tipo alianza en el la db
 * @param {*} req 
 * @param {*} res 
 * @return newAlliance
 */
const newAlliance = async (req, res) => {
  const {nombreOrganizacion, mision, nombreInstructor, correo, celular, puesto, cantIntegrantes, ciudad, taller, redesSociales, origen} = req.body;

  if(origen === "Alianzas"){
   try{
     const result = await FormModel.findOne({email: correo, origin: origen})  

     if(!result || result && result.origin !== origen){
       const ress = new FormModel({
         nameOrganization: nombreOrganizacion,
         mission: mision,
         nameInstructor: nombreInstructor,
         email: correo,
         phone: celular,
         position: puesto,
         numberMiembres: cantIntegrantes,
         city: ciudad,
         workShop: taller,
         socialNetworks: redesSociales,
         origin: origen
       })
       await ress.save()
 
       res.status(200).json({ress})
     }else{  
       handlerHttpError(res, `ERROR_EL_USUARIO_CON_ESE_ORIGEN_YA_EXISTE`, 400)
     }
   }catch(error){
    handlerHttpError(res, `ERROR_OCURRIDO_EN_LA_PETICION`, 400)
   }
  }else{
    handlerHttpError(res, `ERROR_ORIGEN_DEBE_SER: "Alianzas"`)
  }
}

/**
 * TODO!: eliminar un formulario de usuario
 * @param {*} req 
 * @param {*} res 
 */
const deleteFormById = async (req, res) => {
  const {id} = req.params;

  try{
      await FormModel.findByIdAndDelete(id)
      res.status(200).json({message: `USUARIO_FORM_ELIMINADO_CON_EXITO`})
  }catch(error){
    handlerHttpError(res, `ERROR_OCURRIDO_EN_PETICION`, 400)
  }
}

module.exports = {
    getAllForms,
    getFormById,
    newSpecialist,
    newOrganization,
    newAlliance,
    deleteFormById
}