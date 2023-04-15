const handlerHttpError = require("../../utils/handlerHttpError");
const { addSuscriptiontoList } = require("./sendEmail")
const { matchedData } = require("express-validator");
const { suscription } = require("../../models")
const { person } = require("../../models");

const getAllSusribers = async (req, res) => {
    const suscribers = await suscription.find({})
    return suscribers
}

const addSuscription = async (req, res) => {
    const { first_name, last_name, email } = matchedData(req)
    try {
        const existentSuscription = await suscription.findOne({ email: email })
        console.log(existentSuscription)
        if (existentSuscription !== null) {
            return handlerHttpError(res, "El correo ingresado ya esta suscrito")
        }
        const existentPerson = await person.findOne({ email: email })

        let newSuscription
        //if(existenteSuscription.length > 0) throw new Error({message})
        if (!existentPerson) {
            const newPerson = new person({
                email: email,
                fullname: `${first_name} ${last_name}`
            });
            await newPerson.save();
        } else {
            existentPerson.suscriber = true;
            await existentPerson.save()

        }
        newSuscription = new suscription({
            first_name,
            last_name,
            email,
        })

        await newSuscription.save()

        await addSuscriptiontoList(newSuscription);
        return res.status(200).json({ message: "succesful" })


    } catch (error) {
        console.error(error)
        handlerHttpError(res, "No pudo agregarse la suscripcion o el email ingresado ya existe")
    }

}


module.exports = {
    addSuscription,
    getAllSusribers
}