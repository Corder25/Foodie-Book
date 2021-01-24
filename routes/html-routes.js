// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("members");
    }
    res.render("index");
  });

  app.get("/signup", (req, res) => {
    if (req.user) {
      res.render("members");
    }
    res.render("index");
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("members");
    }
    res.render("login");
  });

  app.get("/logout", (req, res) => {
    // If the user already has an account send them to the members page
    // localStorage.clear(); or localStorage.removeItem("user") - local storage comes back undefined
    req.logout();
    res.redirect("/login")
    // res.render("login");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.render("members");
  });

  app.get("/rant", isAuthenticated, (req, res) => {
    res.render("rant");
  });

  app.get("/my-rants", isAuthenticated, (req, res) => {
    res.render("my-rants");
  });

  app.get("/user", isAuthenticated, (req, res) => {
    res.render("user");
  });

  app.get("/restaurant", isAuthenticated, (req, res) => {
    res.render("restaurant");
  });

  app.get("/all-rants", isAuthenticated, (req, res) => {
    res.render("all-rants");
  });
};
