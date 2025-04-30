const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
const formController = require("../controllers/formController");
const signUpValidation = require("../controllers/signUpValidation");

indexRouter.get("/", indexController.getHome);

indexRouter.get("/sign-up", formController.getSignUp);
indexRouter.post("/sign-up", signUpValidation, formController.postSignUp);

indexRouter.get("/log-in", formController.getLogIn);
indexRouter.post("/log-in", formController.postLogIn);

indexRouter.get("/log-out", formController.logOut);

indexRouter.get("/new", indexController.newMessage);
indexRouter.post("/new", indexController.addMessage);

indexRouter.get("/view/:id", indexController.viewMessage);
indexRouter.post("/view/:id/delete", indexController.deletePost);

module.exports = indexRouter;
