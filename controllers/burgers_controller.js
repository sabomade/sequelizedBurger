var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var db = require("../models");

//load index page with all burgers in asencding order by name
router.get("/", function(req, res) {
  db.Burger.findAll({
    order: [["burgername", "ASC"]],
    include: [db.Customer]
  }).then(function(data) {
    var hbsObject = {
      burgers: data
    };
    res.render("index", hbsObject);
  });
});

//create new burger
router.post("/api/burgers", function(req, res) {
  console.log("adding to db:", req.body);
  db.Burger.create({
    creator: req.body.creator,
    burgername: req.body.burgername
  }).then(function(result) {
    console.log(result);
    res.json({ id: result.insertId });
    res.redirect("/");
  });
});

//update burger to devoured
router.put("/api/burgers/:id", function(req, res) {
  console.log("---inside put----");
  db.Burger.update(
    {
      devoured: 1
    },
    {
      where: {
        id: req.params.id
      }
    }
  );
  console.log("--put complete----");
  // res.redirect("/");
});

//creat new customer
router.post("/api/customers", function(req, res) {
  console.log("req.body", req.body);
  db.Customer.create({
    customername: req.body.customername,
    BurgerId: req.body.id
  });

  db.Burger.update(
    {
      devoured: req.body.devoured
    },
    {
      where: {
        id: req.body.id
      }
    }
  ).then(function(result) {
    // res.redirect("/");
  });
});

module.exports = router;
