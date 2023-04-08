const FormModel = require('../../database/Form.model')

const getAllFormsController = async ({origen}) => {
  if(origen){
    const filter = await FormModel.find({origin: {$regex: new RegExp(`${origen}`, 'i')}})
    return filter
  }else{
    try{
      const result = FormModel.find({})
      return result
    }catch(err){
      throw new Error({message: err})
    } 
  }
}

const getFormByIdController = async ({id}) => {
    try{
      const result = await FormModel.findById(id)
      if(result){
        return result
      }else{
       res.status(404).json(`No se ha encontrado el id`)
      } 
    }catch(err){
     throw new Errror({message: err})
    }
}

const postNewEspecialistaController = async ({nombre, celular, pais, taller, correo, origen}) => {
   if(origen === "Especialistas"){
    try{
        const esta = await FormModel.findOne({email: correo, origin: origen})
        if(!esta || esta && esta.origin !== origen){
          const newEspecialista = new FormModel({
            name: nombre,
            phone: celular,
            country: pais,
            workShop: taller,
            email: correo,
            origin: origen
          })  
          await newEspecialista.save()
          return newEspecialista
        }else{
          throw new Error(`El usuario con ese correo y origen, ya existe en la base de datos`)  
        }
    }catch(err){
       throw new Error(err) 
    }
   }else{   
   throw new Error(`El origen debe ser igual a "Especialistas"`)
   }         
}

const postNewOrganizacionesController = async ({nombreEmpresa, correo, nombreInstructor, puesto, celular, ciudad, taller, origen}) => {
   if(origen === "Organizaciones"){
   try{
       const result = await FormModel.findOne({email: correo, origin: origen})
       if(!result || result && result.origin !== origen){
         const newOrganizacion = new FormModel({
           nameCompany: nombreEmpresa,
           email: correo,
           nameInstructor: nombreInstructor,
           position: puesto,
           phone: celular,
           city: ciudad,
           workShop: taller,
           origin: origen
         })  
         await newOrganizacion.save()
         return newOrganizacion
       }else{
         throw new Error(`El usuario con ese correo y origen, ya existe en la base de datos`)  
       }
    }catch(err){
     throw new Error(err)
    } 
   }else{
    throw new Error(`El origen debe ser igual a "Organizaciones"`)
   } 
}

const postNewAlianzasController = async ({nombreOrganizacion, mision, nombreInstructor, correo, celular, puesto, cantIntegrantes, ciudad, taller, redesSociales, origen}) => {
    if(origen === "Alianzas"){
      try{
          const esta = await FormModel.findOne({email: correo, origin: origen})
          if(!esta || esta && esta.origin !== origen){
            const newAlianza = await FormModel({
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
            await newAlianza.save()
            return newAlianza
          }else{
           throw new Error(`El usuario con ese correo y origen, ya existe en la base de datos`)  
          }
      }catch(err){
        throw new Error(err)
      } 
    }else{
      throw new Error(`El origen unicamente debe ser "Alianzas"`)  
    }
}

const deleteFormByIdController = async ({id}) => {
  try{
    await FormModel.findByIdAndDelete(id)
    return `El formulario del usuaro con id: ${id}, ha sido eliminado con exito`
  }catch(err){
    throw new Error(err)
  } 
}

module.exports = {
    getAllFormsController,
    getFormByIdController,
    postNewEspecialistaController,
    postNewOrganizacionesController,
    postNewAlianzasController,
    deleteFormByIdController
}