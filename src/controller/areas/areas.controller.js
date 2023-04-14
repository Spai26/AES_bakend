const { matchedData } = require("express-validator");
const {area} = require('../../models')
const handlerHttpError = require('../../utils/handlerHttpError')

const getAllAreas = async (req, res) => {
    try{
       const result = await area.find({})
       res.status(200).json( { result } ) 
    }catch(err){
        handlerHttpError(res, `ERROR_OCURRIDO_EN_PETICION`, 400)
    }
}

const createNewArea = async (req, res) => {
   const dataArea =  matchedData(req, {location: ['body']})
   const {name} = dataArea;

   try{
    const existsName = await area.findOne({name: name})

    if(!existsName){
      const newArea = new area(
        {
            name: name
        }
      )  
      await newArea.save()
      res.status(201).json({ newArea })
    }else{
        handlerHttpError(res, `ERROR_ESE_AREA_CON_ESE_NAME_YA_EXISTE_VALIDA_OTRO_NOMBRE`, 400)
    }
   }catch(err){
    handlerHttpError(res, `ERROR_OCURRIDO_EN_PETICION`, 400)
   }
}

const deleteAreaById = async (req, res) => {
   const idArea = matchedData(req, ['body'])
   const {id} = idArea;
   
   try{
    const areaId = await area.findById(id)
    if(areaId){
      await area.findByIdAndDelete(id)
      res.status(200).json({message: `El area con el id: ${id}, se ha eliminado con éxito`})  
    }else{
      handlerHttpError(res, `ERROR_OCURRIDO_NO_EXISTE_ESE_ID_VALIDALO`, 404)  
    }
   }catch(err){
    handlerHttpError(res, `ERROR_OCURRIDO_EN_PETICION`, 400)
   }
}

module.exports = {
    createNewArea,
    getAllAreas,
    deleteAreaById
}