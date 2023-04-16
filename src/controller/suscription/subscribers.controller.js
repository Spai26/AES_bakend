const handlerHttpError = require("../../utils/handlerHttpError");
const { addSuscriptiontoList } = require("./sendEmail");
const { ContactsApi } = require("../../config/sendinblue");
const { suscription } = require("../../models");
const { person } = require("../../models");

const getAllSusribers = async (req, res) => {
  const suscribers = await suscription.find({});
  res.status(200).json(suscribers);
};

const deleteSuscriptionById = async (req, res) => {
  const { id } = req.params;
  try {
    await suscription.findByIdAndDelete(id);
    res.status(200).json({ message: `Eliminado success` });
  } catch (err) {
    handlerHttpError(res, `origen: delete_suscription ${err}`);
  }
};

const addSuscription = async (req, res) => {
  const { email } = req.body;

  try {
    let existentSuscription = await suscription.findOne({ email: email });
    if (!existentSuscription) {
      let newSuscription = new suscription({
        email: email,
      });

      await newSuscription.save();

      let newSuscrip = await suscription.findOne({ email: email });
      let newEmail = newSuscrip.email;

      await addSuscriptiontoList({ email: newEmail });

      let existentPerson = await person.findOne({ email: email });

      if (!existentPerson) {
        let newPerson = new person({
          email: email,
          suscriber: true,
        });
        await newPerson.save();
        res.status(200).json({ message: "succesful_create" });
      } else {
        let getPerson = await person.findOne({ email: email });
        getPerson.suscriber = true;
        await getPerson.save();
        res.status(200).json({ message: "succesful_aggregate" });
      }
    } else {
      handlerHttpError(res, "El correo ingresado ya esta suscrito", 400);
    }
  } catch (error) {
    handlerHttpError(
      res,
      "No pudo agregarse la suscripcion o el email ingresado ya existe",
      400
    );
  }
};

const unsuscribeUser = async (req, res) => {
  const { email } = req.body;
  const listIds = 3;

  try {
    if (!email) {
      return handlerHttpError(
        res,
        "Debes ingresar un email a desuscribir",
        404
      );
    }

    let personUnsuscribe = await person.findOne({ email: email });

    if (!personUnsuscribe) {
      handlerHttpError(
        res,
        "No se encontró una persona con ese correo electrónico",
        404
      );
    }

    personUnsuscribe.suscriber = false;
    await personUnsuscribe.save();

    let deleteSuscriber = await suscription.findOne({ email: email });

    if (deleteSuscriber) {
      await deleteSuscriber.remove();

      let apiInstance = ContactsApi;
      await apiInstance.deleteContact(email);
      res.status(200).json({
        message: "El usuario ha sido dado de baja de la suscripción con éxito",
      });
    } else {
      handlerHttpError(res, `ERROR_EL_USUARIO_NO_ESTABA_SUSCRIPTO`, 404);
    }
  } catch (error) {
    handlerHttpError(res, error.message, 400);
  }
};

module.exports = {
  addSuscription,
  getAllSusribers,
  deleteSuscriptionById,
  unsuscribeUser,
};
