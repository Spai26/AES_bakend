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
    const {fullname, email } = req.body;
    let existentSuscription = await suscription.findOne({ email: email })
    
    try {
        if (!existentSuscription) {
            let newSuscription = new suscription({
                email
            })
            
            await newSuscription.save()
            await addSuscriptiontoList(newSuscription)
    
            let existentPerson = await person.findOne({ email: email })
    
            if (!existentPerson) {
                let newPerson = new person({
                    fullname,
                    email,
                    suscriber: true
                });
                await newPerson.save();
            } else {
                existentPerson.suscriber = true;
                await existentPerson.save()
            };
            return res.status(200).json({ message: "succesful" });
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