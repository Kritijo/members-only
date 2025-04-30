const { body } = require("express-validator");
const db = require("../db/queries/user");

const signUpValidation = [
    body("firstname")
        .trim()
        .notEmpty()
        .withMessage("First name is required.")
        .isAlpha()
        .withMessage("First name must only contain letters."),
    body("lastname")
        .trim()
        .notEmpty()
        .withMessage("Last name is required.")
        .isAlpha()
        .withMessage("Last name must only contain letters."),
    body("email")
        .isEmail()
        .withMessage("Invalid email.")
        .bail()
        .custom(async (email) => {
            const user = await db.getUserByEmail(email);
            if (user) {
                throw new Error("Email already in use");
            }
        }),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters."),
    body("confirm-password").custom((confirmPassword, { req }) => {
        if (confirmPassword !== req.body.password) {
            throw new Error("Passwords did not match");
        }
        return true;
    }),
];

module.exports = signUpValidation;
