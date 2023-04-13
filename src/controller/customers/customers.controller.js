const { matchedData } = require("express-validator");
const { customer } = require("../../models");
const handlerHttpError = require("../../utils/handlerHttpError");
const { isExist } = require("../../libs/findUser");

//listar todos los customers

const getAllCustomers = async (req, res) => {
  const allCustomers = await customer.find({});
  res.send(allCustomers);
};

// Agregar un nuevo Customer o formulario
const RegisterCustomer = async (req, res) => {
  try {
    const {
      fullname,
      email,
      events,
      organization,
      work,
      cargo,
      phone,
      area,
      assistants,
      social_networks,
      origin,
      country,
      city,
      filepath,
    } = req.body;

    const info = new customer({
      fullname: fullname,
      email: email,
      events: events,
      organization: organization,
      work: work,
      cargo: cargo,
      phone: phone,
      area: area,
      assistants: assistants,
      social_networks: social_networks,
      origin: origin,
      country: country,
      city: city,
      filepath: filepath,
    });
    await info.save();
    res.status(201).json({ message: "Customer registrado con éxito!!" });
  } catch (error) {
    console.error(error);
    handlerHttpError(res, "Customer no pudo registrarse", 404);
  }
};

const validatorEmail = async (email) => {
  let existingCustomer = await customer.findOne({ email: email });
  return existingCustomer ? true : false;
};
const RegisterCustomerSpecialist = async (req, res) => {
  try {
    const { fullname, email, phone, area, origin, country, filepath } = req.body;

    const emailExists = await validatorEmail(email);
    if (emailExists) {
      let existingCustomer = await customer.findOne({ email: email });
      existingCustomer.origin = [...existingCustomer.origin, origin];
      await existingCustomer.save();
      res.status(200).json({ message: "Especialista registrado con éxito!!" });
    } else {
      const info = new customer({
        fullname: fullname,
        email: email,
        phone: phone,
        area: area,
        origin: [origin],
        country: country,
        filepath: filepath,
      });
      await info.save();
      res.status(201).json({ message: "Especialista registrado con éxito!!" });
    }
  } catch (error) {
    handlerHttpError(res, "Especialista no pudo registrarse", 404);
  }
};


module.exports = {
  getAllCustomers,
  RegisterCustomer,
  RegisterCustomerSpecialist,
};
