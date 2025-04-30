const db = require("../db/queries/user.js");
const { validationResult } = require("express-validator");

exports.getAdminQuiz = async (req, res, next) => {
    res.render("admin-form", {
        errors: [],
        oldInput: {},
    });
};

exports.postAdminQuiz = async (req, res, next) => {
    const { secretCode, creator } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render("admin-form", {
            errors: errors.array(),
            oldInput: req.body,
        });
    }
    try {
        if (
            secretCode === process.env.SECRET_CODE &&
            creator === process.env.CREATOR
        ) {
            await db.promoteToAdmin(req.user.id);
            return res.redirect("/");
        } else {
            res.render("/admin-form");
        }
    } catch (err) {
        next(err);
    }
};
