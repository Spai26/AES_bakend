const Form = require('../../database/Form.model')

const getAllFormsController = async () => {
  try{
    const res = await Form.find({})
     return res
  }catch(err){
    throw new Error(`msg: ${err}`)
  }
}

const getFormByIdController = async ({id}) => {
 try{
   const res = await Form.findById(id)
     return res;  
 }catch(err){
  throw new Error(`msg: ${err}`)
 } 
}


const newEspecialistaController = async ({nombre, celular, pais, cargo, correo, origen}) => {
  const esta = await Form.findOne({email: correo, origin: origen})
  
  if(!esta){
    try{
      const res = new Form({
        name: nombre,
        phone: celular,
        country: pais,
        post: cargo,
        email: correo,
        origin: origen
      })
      await res.save()
      return res
    }catch(err){
      throw new Error(`msg: ${err}`)
    }
  }else{
    throw new Error(`Ya existe un formulario creado con ese Correo y origen`)
  }
}

const newOrganizacionesController = async ({nombreEmpresa, correo, nombreInstructor, puesto, celular, ciudad, cargo, origen}) => {
  const esta = await Form.findOne({email: correo, origin: origen})

 if(!esta){
   try {
     const res = new Form({
       nameCompany: nombreEmpresa,
       email: correo,
       nameInstructor: nombreInstructor,
       position: puesto,
       phone: celular,
       city: ciudad,
       post: cargo,
       origin: origen
     })
     await res.save()
     return res
   }catch(err){
     throw new Error(`msg: ${err}`)
   }
 }else{
  throw new Error(`Ya existe un formulario creado con ese correo y origen`)
 } 
}

const newAlianzaController = async ({nombreOrganizacion, mision, correo, nombreCompleto, celular, puesto, cantIntegrantes, ciudad, cargo, origen}) => {
 const esta = await Form.findOne({email: correo, origin: origen}) 
 
 if(!esta){
   try{
     const res = new Form({
       nameOrganization: nombreOrganizacion,
       mission: mision,
       email: correo,
       completeName: nombreCompleto,
       phone: celular,
       position: puesto,
       numberMiembres: cantIntegrantes,
       city: ciudad,
       post: cargo,
       origin: origen
     })  
   
     await res.save()
     return res
   }catch(err){
     throw new Error(`msg: ${err}`)
   }
 }else{
  throw new Error(`Ya existe un formulario creado con ese correo y mismo origen`)
 } 
}

module.exports = {
    getAllFormsController,
    getFormByIdController,
    newEspecialistaController,
    newOrganizacionesController,
    newAlianzaController
}