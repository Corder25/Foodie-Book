const db = require("../models");

module.exports = function (app) {

  //views a selected rant under a specific author
  app.get("/api/rants/:id", function(req, res) {
    //
    db.Rant.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
  
    // POST route for saving a new rant for current user
    app.post("/api/rants", function (req, res) {
      db.Rant.create(req.body).then(function (dbRant) {
        res.json(dbRant);
      });
    });

  
    // PUT route for updating current user's rants
    app.put("/api/rants", function (req, res) {
      db.Rant.update(
        req.body,
        {
          where: {
            id: req.body.id
          }
        }).then(function (dbRant) {
          res.json(dbRant);
        });
    });
  };
  