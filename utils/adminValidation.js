const { body } = require("express-validator");

const signUpValidation = [
    body("creator")
        .trim()
        .isAlpha()
        .withMessage("Creator name must only contain letters."),
    body("secretCode")
        .trim()
        .isNumeric()
        .withMessage("Secret code must have numeric input."),
];

module.exports = signUpValidation;
