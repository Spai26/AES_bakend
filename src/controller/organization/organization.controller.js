const { matchedData } = require("express-validator");
const { person } = require("../../models");
const { organization } = require("../../models");
const { area } = require("../../models");
const handlerHttpError = require("../../utils/handlerHttpError");

const getAllOrganizationsForms = async (req, res) => {
  try {
    const { email } = req.query;

    if (email) {
      const result = await organization.find({
        email: { $regex: email, $options: "i" },
      });
      res.status(200).json(result);
    }
    const result = await organization.find({}).populate("area", "name");
    res.status(200).json(result);
  } catch (err) {
    handlerHttpError(res, `ERROR_OCURRIDO_AL_TRAER_LA_INFORMACION`, 400);
  }
};

const getOrganizationById = async (req, res) => {
  const { id } = req.params;
  req = matchedData(req);

  try {
    const result = await organization.findById(id).populate("area", "name");

    res.status(200).json(result);
  } catch (err) {
    handlerHttpError(res, `El formulario no existe o no es valido!`, 400);
  }
};

const createOrganization = async (req, res) => {
  const {
    organizations,
    work,
    email,
    fullname,
    phone,
    post,
    assistants,
    social,
    area,
  } = matchedData(req);

  //busco
  let findPerson = await person.findOne({ email: email });
  console.log("find => ", findPerson);
  try {
    let newOrganization = new organization({
      organizations: organizations,
      work: work,
      email: email,
      fullname: fullname,
      phone: phone,
      post: post,
      assistants: assistants,
      social: social,
      area: area,
    });

    const resultOrg = await newOrganization.save();

    /* 
    if (!findPerson) {
      let newPerson = new person({ email: email, fullname: fullname });
      await newPerson.save();

      let getPerson = await person.findOne({ email: email });
      getPerson.organization = [...getPerson.organization, organizationGet._id];
      await getPerson.save();
      res.status(200).json({ message: `Organización creada con éxito` });
    } else {
      personGet.organization = [...personGet.organization, organizationGet._id];
      await personGet.save();
      res.status(200).json({ message: `Organización agregada con éxito` });
    } */
    res.status(201).json({ message: "Registro exitoso!" });
  } catch (err) {
    console.error(err);
    handlerHttpError(res, `ERROR_OCURRIDO_EN_PETICION`, 400);
  }
};

const putOrganizationById = async (req, res) => {
  const dateId = matchedData(req, { location: ["params"] });
  const dateView = matchedData(req, { location: ["body"] });
  const { id } = dateId;
  const { view } = dateView;

  try {
    await organization.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          view: view,
        },
      }
    );

    res.status(200).json({ message: `Institucion actualizada` });
  } catch (err) {
    handlerHttpError(res, `ERROR_OCURRIDO_EN_PETICION`, 400);
  }
};

module.exports = {
  getAllOrganizationsForms,
  createOrganization,
  getOrganizationById,
  putOrganizationById,
};
