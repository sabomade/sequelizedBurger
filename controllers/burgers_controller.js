var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");
var customer = require("../models/customer.js");
var burger_customer = require("../models/BurgerCustomer.js");

// Create all our routes and set up logic within those routes where required.
router.get("/burgers", function(req, res) {
  // get all burgers
  const allBurgers = await burgers.findAll({
    //include the customers
    include:[{
      model: Customer,
      as: "customers",
      required: false,
      //pass customer attributes we want to retrieve
      attributes:['id','customer_name'],
      through:{
        model: BurgerCustomer,
        as: "burgerCustomers",
        attributes:['qty'],
      }
    }]
  });
  
  return respondWith(res, 200, ["returning all customers"], {allCustomers});
 
});

// NEED TO REDO ALL BELOW THIS POINT

router.post("/api/burgers", function(req, res) {
  burger.create([
    "burger_name", "devoured"
  ], [
    req.body.burger_name, req.body.devoured
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  
  if (req.params.id === 'all') {
    burger.truncate("burgers", function(result) {
      if (result.affectedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        return res.status(200).end();
      }
    });
  } else {

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
  }
});



// Export routes for server.js to use.
module.exports = router;
