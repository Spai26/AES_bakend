const handlerHttpError = require("../../utils/handlerHttpError");
const { addSuscriptiontoList } = require("./sendEmail")
const { matchedData } = require("express-validator");
const { suscription } = require("../../models")
const { person } = require("../../models");

const getAllSusribers = async (req, res) => {
    const suscribers = await suscription.find({})
    res.status(200).json(suscribers)
}

const deleteSuscriptionById = async(req, res) => {
    const {id} = req.params;
    try{
       await suscription.findByIdAndDelete(id)
       res.status(200).json({message: `Eliminado success`}) 
    }catch(err){
        console.log(err)
    }
}

const addSuscription = async (req, res) => {
    const {fullname, email } = matchedData(req)
    try {
        const existentSuscription = await suscription.findOne({ email: email })
        if (existentSuscription !== null) {
            return handlerHttpError(res, "El correo ingresado ya esta suscrito")
        }else{
            let newSuscription = new suscription({
                email
            })
            
            await newSuscription.save()
            await addSuscriptiontoList(newSuscription)
    
            let existentPerson = await person.findOne({ email: email })
    
            if (!existentPerson) {
                let newPerson = new person({
                    fullname: fullname,
                    email: email,
                    suscriber: true
                });
                await newPerson.save();
            } else {
                existentPerson.suscriber = true;
                await existentPerson.save()
            };
            return res.status(200).json({ message: "succesful" });
        }
        
    } catch (error) {
        console.error(error)
        handlerHttpError(res, "No pudo agregarse la suscripcion o el email ingresado ya existe")
    }

}


module.exports = {
    addSuscription,
    getAllSusribers,
    deleteSuscriptionById
}