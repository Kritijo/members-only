require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const initializePassport = require("./config/passport");
const setupMiddleware = require("./config/middleware");
const indexRouter = require("./routes/indexRouter");

const app = express();

setupMiddleware(app);

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);

app.use((req, res, next) => {
    res.status(404).render("partials/error", {
        message: "Page Not Found",
        status: 404,
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(err.status || 500).render("partials/error", {
        message: err.message || "Something went wrong",
        status: err.status || 500,
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log(`Express server running at http://localhost:${PORT}`)
);
