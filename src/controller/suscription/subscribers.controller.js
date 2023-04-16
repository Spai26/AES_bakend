const handlerHttpError = require("../../utils/handlerHttpError");
const { addSuscriptiontoList } = require("./sendEmail")
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
    const {email} = req.body
    
    try {
        let existentSuscription = await suscription.findOne({ email: email })
        if (!existentSuscription) {
            let newSuscription = new suscription({
                email: email
            })
            
            await newSuscription.save()

            let newSuscrip = await suscription.findOne({email: email})
            let newEmail = newSuscrip.email

            await addSuscriptiontoList({email: newEmail})
    
            let existentPerson = await person.findOne({ email: email })
    
            if (!existentPerson) {
                let newPerson = new person({
                    email: email,
                    suscriber: true
                });
                await newPerson.save();
              res.status(200).json({ message: "succesful_create" })
            }else{
                let getPerson = await person.findOne({email: email})
                getPerson.suscriber = true;
                await getPerson.save()
                res.status(200).json({ message: "succesful_aggregate" })
            };
        }else{
         handlerHttpError(res, "El correo ingresado ya esta suscrito", 400)
        }       
    } catch (error) {
        handlerHttpError(res, "No pudo agregarse la suscripcion o el email ingresado ya existe", 400)
    }

}

module.exports = {
    addSuscription,
    getAllSusribers,
    deleteSuscriptionById
}