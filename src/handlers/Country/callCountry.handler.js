const Country = require("../../database/Country");

const getallCountry = async (req, res, next) => {
  try {
    const allCountry = await Country.find({});

    allCountry
      ? res.status(200).json(allCountry)
      : res.status(404).json({ message: "no se encontro paises registrado" });
  } catch (error) {
    next(error);
  }
};

module.exports = getallCountry;
