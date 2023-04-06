const Suscribers = require('../../database/Suscribers.model')

const getAllSuscribersByNameController = async ({name}) => {
 try{ 
    const resultado = await Suscribers.find({name: { $regex: new RegExp(`${name}`, "i") }})
    return resultado; 
 }catch(err){
    throw new Error(`msg: ${err}`)
 }
}

const getAllController = async () => {
   try{
    const resultado = await Suscribers.find({})
    return resultado;
   }catch(err){ 
    throw new Error(`msg: ${err}`)
   } 
}

const postSuscribersController = async ({nombre, correo, notificaciones}) => {
 const esta = await Suscribers.findOne({email: correo})   
 
 if(!esta){
     try{
        const result = new Suscribers({
           name: nombre,
           email: correo,
           notifications: notificaciones,
           status: true 
        })
        await result.save()
        return result
      }catch(err){
        throw new Error(`msg: ${err}`)
      } 
 }else{
    throw new Error(`El usuario con ese correo ya esta registrado en la base de datos`)
 }
}

const updateSuscribersController = async ({id, nombre, correo, notificaciones, status}) => {
    const res = await Suscribers.findById(id)

    if(res){
      res.nombre = nombre,  
      res.email = correo, 
      res.notifications = notificaciones,
      res.status = status
      
      await res.save()
      return res;
    }else{
        throw new Error(`No se ha encontrado el usuario con ese nombre y correo, por favor verificalo`)
    }
}

const deleteSuscribersController = async ({id}) => {
   const resultado = await Suscribers.findByIdAndDelete(id)
   
   if(resultado){
    return `El usuario suscripto con el id: ${id}, se ha eliminado con EXITO`
   }else{
    throw new Error(`No se ha encontrado el usuario con el id: ${id}`)
   }
}

module.exports = {
    getAllSuscribersByNameController,
    getAllController,
    postSuscribersController,
    updateSuscribersController,
    deleteSuscribersController
}