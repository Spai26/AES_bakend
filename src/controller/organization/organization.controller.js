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

const createOrganization = async (req, res) => {
   const allDate = matchedData(req, {location: ['body']})
   const {organizations, work, email, fullname, phone, post, assistants, city, social, view, areas} = allDate;
   
   try{
    const getArea = await area.findOne({name: areas})
    let getEmailPerson = await person.findOne({email: email})
    const getOrganization = await organization.findOne({email: email})

    if(!getArea){
      res.status(404).json({message: `ERROR_DEBE_INGRESAR_UN_AREA_EXISTENTE_EN_LA_DB`})
    }

    if(!getEmailPerson && !getOrganization){
      let newOrganization = new organization({
            organizations: organizations,
            work: work,
            email: email,
            fullname: fullname,
            phone: phone,
            post: post,
            assistants: assistants,
            city: city,
            social: social,
            view: view,
            area: areas,
        }) 
      await newOrganization.save()

        try{
            let getId = await organization.findOne({email: email})

            let newPerson = new person({
                 email: email,
                 fullname: fullname            
            })
            await newPerson.save()

            let result = await person.findOne({email: email}) 

            result.organization = [...result.organization, getId._id]
            await result.save()
            res.status(201).json({message: `Todo ha salido con éxito`})
        }catch(err){
           handlerHttpError(res, `ERROR_OCURRIDO_AL_CREAR_PERSON`, 400) 
        }
      }else{
        if(getEmailPerson && !getOrganization){
            let newOrganization = new organization({
                organizations: organizations,
                work: work,
                email: email,
                fullname: fullname,
                phone: phone,
                post: post,
                assistants: assistants,
                city: city,
                social: social,
                view: view,
                area: areas,
            }) 
          await newOrganization.save()

          try{
            let getId = await organization.findOne({email: email})

            let result = await person.findOne({email: email})
            
            result.organization = [...result.organization, getId._id]
            await result.save()
            res.status(201).json({message: `Todo ha salido con éxito`})
          }catch(err){
            handlerHttpError(res, `ERROR_OCURRIDO_AL_GUARDAR_CAMBIOS_EN_PERSON`, 400)
          }
        }
      }  
   }catch(err){
    handlerHttpError(res, `ERROR_OCURRIDO_EN_PETICION`, 400)
   }
}

module.exports = {
    getAllOrganizationsForms,
    createOrganization
}