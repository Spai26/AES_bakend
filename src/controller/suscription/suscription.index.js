const { addSuscription } = require("./subscribers.controller");

const handlerHttpError = require("../../utils/handlerHttpError");

const postSuscription = async (req, res) => {
    const { first_name, last_name, email } = request.body
    try {
        const suscription = await addSuscription(first_name, last_name, email)
        response.status(200).json({ message: "succesful" })
    } catch (error) {
        handlerHttpError(error)
    }
}

module.exports = {
    postSuscription
}