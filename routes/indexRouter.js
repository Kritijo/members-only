const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
const formController = require("../controllers/formController");

indexRouter.get("/", indexController.getHome);
indexRouter.get("/sign-up", formController.getSignUp);
indexRouter.get("/log-in", formController.getLogIn);
indexRouter.post("/sign-up", formController.postSignUp);
indexRouter.post("/log-in", formController.postLogIn);
indexRouter.get("/log-out", formController.logOut);
indexRouter.get("/new", indexController.newMessage);
indexRouter.post("/new", indexController.addMessage);
indexRouter.get("/view/:id", indexController.viewMessage);

module.exports = indexRouter;
