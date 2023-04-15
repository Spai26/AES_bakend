const { check } = require("express-validator");
const validateResults = require("../utils/handlerValidator");

const validatorAddSuscription = [
    check("first_name").exists().notEmpty(),
    check("last_name").exists().notEmpty(),
    check("email").exists().notEmpty().isEmail(),

    (req, res, next) => {
        return validateResults(req, res, next);
    },
];


module.exports = { validatorAddSuscription }