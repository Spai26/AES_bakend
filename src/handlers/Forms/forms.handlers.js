const {
    newEspecialistaController, 
    getAllFormsController,
    getFormByIdController,
    newOrganizacionesController,
    newAlianzaController
} = require('../../controllers/Form/form.controllers')

const getAll = async (req, res, next) => {
    try{
      const result = await getAllFormsController()
      res.status(200).json(result)
    }catch(err){
      next(err)
    } 
}

const getFormById = async (req, res, next ) => {
    const {id} = req.params;

   if(id){
       try{     
          const result = await getFormByIdController({id: id})
          res.status(200).json(result) 
       }catch(err){
          next(err) 
       }
   }else{
    res.status(500).send({message: `Debe ingresar el id por params como id=...`})
   } 
}

const newEspecialista = async (req, res, next) => {
   const {nombre, celular, pais, cargo, correo, origen} = req.body;

  if(origen === 'Especialista'){
      if(nombre!==undefined || nombre!==null && celular!==undefined || celular!==null && pais!==undefined || pais!==null && cargo!==undefined || cargo!==null && correo!==null || correo!==undefined && origen){
        try{
          const result = await newEspecialistaController({
            nombre: nombre,
            celular: celular,
            pais: pais,
            cargo: cargo,
            correo: correo,
            origen: origen
          })
          res.status(200).json(result)  
        }catch(err){
            next(err)
        }
      }else{
        res.status(500).json(`Debe ingresar todos los campos requeridos`)
      }
  } else{
    res.status(500).json(`No puede crear este post, ya que es para origen = Especialista`)
  }
}

const newOrganizaciones = async(req, res, next) => {
    const {nombreEmpresa, correo, nombreInstructor, puesto, celular, ciudad, cargo, origen} = req.body;

    if(origen === 'Organizaciones'){
      if(nombreEmpresa && correo && nombreInstructor && puesto && celular && ciudad && cargo && origen){
       try{
        const result = await newOrganizacionesController({
            nombreEmpresa: nombreEmpresa,
            correo: correo,
            nombreInstructor: nombreInstructor,
            puesto: puesto,
            celular: celular,
            ciudad: ciudad,
            cargo: cargo,
            origen: origen
        })
        res.status(200).json(result)
       }catch(err){
        next(err)
       }
      }else{
       res.status(500).json(`Debe ingresar todos los campos requeridos`) 
      } 
    }else{
      res.status(500).json(`No puede crear este post, debe ser origen = Organizaciones`)  
    }
}

const newAlianzas = async (req, res, next) => {
  const {nombreOrganizacion, mision, correo, nombreCompleto, celular, puesto, cantIntegrantes, ciudad, cargo, origen} = req.body;

  if(origen === 'Alianzas'){
    if(nombreOrganizacion && mision && correo && nombreCompleto && celular && puesto && cantIntegrantes && ciudad && cargo && origen){
     try{
        const result = await newAlianzaController({
            nombreOrganizacion: nombreOrganizacion,
            mision: mision,
            correo: correo,
            nombreCompleto: nombreCompleto,
            celular: celular,
            puesto: puesto,
            cantIntegrantes: cantIntegrantes,
            ciudad: ciudad,
            cargo: cargo,
            origen: origen
          })
          res.status(200).json(result)
     }catch(err){
        next(err)
     }  
    }else{
        res.status(500).json(`Debe ingresar todos los campos requeridos`)
    }
  }else{
    res.status(500).json(`No puede hacer este post porque debe ser origen = Alianzas`)
  }
}

module.exports = {
    getAll,
    getFormById,
    newEspecialista,
    newOrganizaciones,
    newAlianzas
}