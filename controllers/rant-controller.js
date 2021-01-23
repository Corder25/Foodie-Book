var express = require("express");
var router = express.Router();
// import the model to use its database functions
const db = require("../models");
// create the routes and set up logic within those routes where required
router.get("/", function(req, res) {
    burger.all(function(data) {
        var bars = {
            burgers: data
        };
        console.log(bars);
        res.render("index", bars);
    });
});
router.post("/api/burgers", function(req, res) {
    burger.create(
        ["burger_name", "devoured"],
        [req.body.burger_name, req.body.devoured],
        function(result) {
            // send back id of new route
            res.json({ id: result.insertId });
        });
});
router.put("/api/burgers/:id", function(req, res) {
    var condition = "ID = " + req.params.id;
    console.log("condition", condition);
    burger.update(
        { devoured: req.body.devoured },
        condition,
        function(result) {
            if (result.changedRows == 0) {
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        }
    );
});
router.delete("/api/burgers/:id", function(req, res) {
    var condition = "ID = " + req.params.id;
    burger.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});
// export those routes for server.js to use
module.exports = router;