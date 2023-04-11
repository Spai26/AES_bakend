const { matchedData } = require("express-validator");
const { customer } = require("../../models");
const handlerHttpError = require("../../utils/handlerHttpError");
const { isExist } = require("../../libs/findUser");

//listar todos los customers

const getAllCustomers = async (req, res) => {
  const allCustomers = await customer.find({});
  //return allCustomers;
  res.send(allCustomers);
};

// Agregar un nuevo Customer o formulario
const createCustomer = async (req, res) => {
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
    res.status(201).json({ message: "Customer creado con éxito!!" });
  } catch (error) {
    console.error(error);
    handlerHttpError(res, "Customer no pudo crearse", 404);
  }
};

const updateCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const isExist = await customer.findOne({ _id: id });

    if (!isExist) return handlerHttpError(res, "Customer no existe!!", 404);
    const info = await customer.findByIdAndUpdate(
        {_id:id},
        {
            $set: {
                fullname: body.fullname,
                email: body.email,
                events: body.events,
                organization: body.organization,
                work: body.work,
                cargo: body.cargo,
                phone: body.phone,
                area: body.area,
                assistants: body.assistants,
                social_networks: body.social_networks,
                origin: body.origin,
                country: body.country,
                city: body.city,
                filepath: body.filepath,
            }
        }
    )
  } catch (error) {}
};

module.exports = { getAllCustomers, createCustomer };
