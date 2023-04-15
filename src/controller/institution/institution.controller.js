const { matchedData } = require("express-validator");
const { person } = require("../../models");
const { institution } = require('../../models')
const { area } = require('../../models')
const handlerHttpError = require("../../utils/handlerHttpError");

const getAllInstitution = async(req, res) => {    
    const {email} = req.query;

   if(email){
    try{
      const result = await institution.find({email: {$regex: new RegExp(`${email}`, 'i')}})
      res.status(200).json(result)  
    }catch(err){
        handlerHttpError(res, `ERROR_OCURRIDO_EN_PETICION`, 400)
    }
   }else{
       try{     
         const result = await institution.find({})
         res.status(200).json(result)  
       }catch(err){
           handlerHttpError(res, `ERROR_OCURRIDO_EN_PETICION`, 400)
       }
   } 
}

const getInstitutionById = async (req, res) => {
    const idDate = matchedData(req, {location: ['params']})
    const {id} = idDate;

    try{
      const getId = await institution.findById(id)
      if(getId){
        res.status(200).json(getId)
      }else{
        handlerHttpError(res, `ERROR_ESE_ID_NO_EXISTE_VERIFICALO`, 404)
      }
    }catch(err){
      handlerHttpError(res, `ERROR_OCURRIDO_EN_PETICION`, 400)  
    }
}

const createInstitution = async (req, res) => {
    const allDate = matchedData(req, {location: ['body']})
    const {organization, email, fullname, phone, post, city, areas} = allDate;
    
    try{
        let getArea = await area.findOne({name: areas})
        if(!getArea){
         res.status(404).json({message: `ERROR_EL_AREA_INGRESADO_NO_EXISTE_EN_LA_DB`})
        }   
            const result = new institution({
                 organization: organization,
                 email: email,
                 fullname: fullname,
                 phone: phone,
                 post: post,
                 city: city,
                 area: areas
             })
             await result.save()
             
             let personGet = await person.findOne({email: email})
             let institutionGet = await institution.findOne({email: email})
     
             if(!personGet){
                let newPerson = new person({email: email, fullname: fullname}) 
                await newPerson.save()
                 
                let getPerson = await person.findOne({email: email})
                getPerson.institution = [...getPerson.institution, institutionGet._id]
                await getPerson.save()
                res.status(200).json({message: `Institucion Creada con éxito`})
             }else{
                 personGet.institution = [...personGet.institution, institutionGet._id]
                 await personGet.save()
                 res.status(200).json({message: `Intitucion agregada con éxito`})
             }  
      }catch(err){
        handlerHttpError(res, `ERROR_OCURRIDO_EN_PETICION`, 400)
      }
}

const putInstitutionById = async (req, res) => {
  const dateId = matchedData(req, {location: ['params']})
  const dateView = matchedData(req, {location: ['body']})
  const {id} = dateId;
  const {view} = dateView;
  
  try{
    await institution.findByIdAndUpdate(
        {_id: id},
        {
            $set: {
                view: view
            }
        }
    )
   
    res.status(200).json({message: `Institucion actualizada`})    
  }catch(err){
    handlerHttpError(res, `ERROR_OCURRIDO_EN_PETICION`, 400)
  }
}

module.exports = {
    getAllInstitution,
    getInstitutionById,
    createInstitution,
    putInstitutionById
}