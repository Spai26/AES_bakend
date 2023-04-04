const { Router } = require("express");
const loadCountry = require("../handlers/Country/preloadCountryDB");
const getallCountry = require("../handlers/Country/callCountry.handler");
const countryRoute = Router();

countryRoute.get("/", loadCountry);
countryRoute.get("/all", getallCountry);

module.exports = countryRoute;
