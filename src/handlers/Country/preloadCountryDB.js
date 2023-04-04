const Country = require("../../database/Country");
const axios = require("axios");

const loadCountry = async (req, res, next) => {
  try {
    const countries = [];

    const api = await axios.get(`https://restcountries.com/v3.1/all`);
    api.data.forEach((c) => {
      countries.push({
        name: c.name.common,
      });
    });

    const a = countries.forEach(async (country) => {
      const newlist = await new Country({
        name: country.name,
      });

      const result = newlist.save();
      if (result) {
        return result;
      } else {
        res.json({ message: "se jodio todo" });
      }
    });
    res.status(200).json(a);
  } catch (error) {
    (error) => next(error);
  }
};

module.exports = loadCountry;
