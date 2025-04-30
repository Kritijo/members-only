const bcrypt = require("bcryptjs");
const passport = require("passport");
const db = require("../db/queries/user");
const { validationResult } = require("express-validator");

exports.getSignUp = async (req, res) => {
    res.render("sign-up-form", {
        errors: [],
        oldInput: {},
    });
};

exports.getLogIn = async (req, res) => {
    res.render("log-in-form");
};

exports.postSignUp = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render("sign-up-form", {
            errors: errors.array(),
            oldInput: req.body,
        });
    }
    try {
        const { firstname, lastname, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.insertUser(firstname, lastname, email, hashedPassword);
        res.redirect("/log-in");
    } catch (error) {
        next(error);
    }
};

exports.postLogIn = (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/log-in",
    })(req, res, next);
};

exports.logOut = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
};
