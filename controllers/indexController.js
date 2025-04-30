const db = require("../db/queries/user");
const mdb = require("../db/queries/messages");

exports.getHome = async (req, res) => {
    const users = await db.getUsers();
    const messages = await mdb.getMessages();
    res.render("index", { users, messages });
};

exports.newMessage = async (req, res) => {
    res.render("message-form");
};

exports.addMessage = async (req, res) => {
    const title = req.body.title;
    const text = req.body.message;
    const user_id = req.user.id;
    await mdb.addMessage(user_id, title, text);
    res.redirect("/");
};

exports.viewMessage = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const msg = await mdb.viewMessage(id);
        const username = await mdb.getUsername(id);
        res.render("message", { msg, username });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.deletePost = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        await mdb.deletePost(id);
        res.redirect("/");
    } catch (err) {
        console.log(err);
        next(err);
    }
};
