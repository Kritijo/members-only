const bcrypt = require("bcryptjs");
const passport = require("passport");
const db = require("../db/queries/user");

exports.getSignUp = async (req, res) => {
    res.render("sign-up-form");
};

exports.getLogIn = async (req, res) => {
    res.render("log-in-form");
};

exports.postSignUp = async (req, res, next) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.insertUser(firstname, lastname, email, hashedPassword);
        res.redirect("/");
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.postLogIn = (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/x",
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
