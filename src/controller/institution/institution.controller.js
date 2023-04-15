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

const createInstitution = async (req, res) => {
    const allDate = matchedData(req, {location: ['body']})
    const {organization, email, fullname, phone, post, city, view, areas} = allDate;
    
    try{
        let getArea = await area.findOne({name: areas})
        if(!getArea){
         res.status(404).json({message: `ERROR_EL_AREA_INGRESADO_NO_EXISTE_EN_LA_DB`})
        }else{
            const result = new institution({
                 organization: organization,
                 email: email,
                 fullname: fullname,
                 phone: phone,
                 post: post,
                 city: city,
                 view: view,
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
        }
       
    }catch(err){
        handlerHttpError(res, `ERROR_OCURRIDO_EN_PETICION`, 400)
    }
}

module.exports = {
    getAllInstitution,
    createInstitution
}