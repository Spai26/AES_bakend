const { matchedData } = require("express-validator");
const { person } = require("../../models");
const { organization } = require('../../models')
const {area} = require('../../models')
const handlerHttpError = require("../../utils/handlerHttpError");

const getAllOrganizationsForms = async (req, res) => {
  const {email} = req.query;
  
  try{
    if(email){
      const result = await organization.find({email: {$regex: new RegExp(`${email}`, 'i')}})
      res.status(200).json(result)
    }else{
      const result = await organization.find({})
      res.status(200).json(result)
    }  
  }catch(err){
    handlerHttpError(res, `ERROR_OCURRIDO_AL_TRAER_LA_INFORMACION`, 400)
  }
}

const getOrganizationById = async (req, res) => {
  const idDate = matchedData(req, {location: ['params']})
  const {id} = idDate;

  try{
    const getId = await organization.findById(id)
    if(getId){
      res.status(200).json(getId)
    }else{
      handlerHttpError(res, `ERROR_ESE_ID_NO_EXISTE_VERIFICALO`, 404)
    }
  }catch(err){
    handlerHttpError(res, `ERROR_OCURRIDO_EN_PETICION`, 400)  
  }
}

const createOrganization = async (req, res) => {
   const allDate = matchedData(req, {location: ['body']})
   const {organizations, work, email, fullname, phone, post, assistants, social, areas} = allDate;
   
   try{
    let getArea = await area.findOne({name: areas});

    if(!getArea){
      res.status(404).json({message: `ERROR_DEBE_INGRESAR_UN_AREA_EXISTENTE_EN_LA_DB`})
    }

      let newOrganization = new organization({
            organizations: organizations,
            work: work,
            email: email,
            fullname: fullname,
            phone: phone,
            post: post,
            assistants: assistants,
            social: social,
            area: areas,
        }) 
      await newOrganization.save()

      let personGet = await person.findOne({email: email})
      let organizationGet = await organization.findOne({email: email})

      if(!personGet){
         let newPerson = new person({email: email, fullname: fullname}) 
         await newPerson.save()
          
         let getPerson = await person.findOne({email: email})
         getPerson.organization = [...getPerson.organization, organizationGet._id]
         await getPerson.save()
         res.status(200).json({message: `Organización creada con éxito`})
      }else{
          personGet.organization = [...personGet.organization, organizationGet._id]
          await personGet.save()
          res.status(200).json({message: `Organización agregada con éxito`})
      }    
   }catch(err){
    handlerHttpError(res, `ERROR_OCURRIDO_EN_PETICION`, 400)
   }
}

const putOrganizationById = async (req, res) => {
  const dateId = matchedData(req, {location: ['params']})
  const dateView = matchedData(req, {location: ['body']})
  const {id} = dateId;
  const {view} = dateView;
  
  try{
    await organization.findByIdAndUpdate(
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
    getAllOrganizationsForms,
    createOrganization,
    getOrganizationById,
    putOrganizationById
}