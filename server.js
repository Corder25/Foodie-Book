// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");

var path = require('path');


// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
    session({
        secret: "keyboard cat",
        resave: true,
        saveUninitialized: true
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname + '../public')));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Requiring our routes
require("./routes/html-routes")(app);
require("./routes/api-routes.js")(app);
// require("./routes/rant-api-routes.js")(app);
// require("./routes/user-api-routes.js")(app);

// var controllers = require('./controllers')(app);
// app.use(controllers);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(
            "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
            PORT,
            PORT
        );
    });
});