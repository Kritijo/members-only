// const db = require("../db/queries/user");

exports.getHome = async (req, res) => {
    res.render(`index`);
};
