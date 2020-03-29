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
  db.Burger.create(
    {
      creator: req.body.creator,
      burgername: req.body.burgername
    },
    function(result) {
      //console.log(result);
      //res.json({ id: result.insertId });
      // res.redirect("/");
    }
  );
});

//update burger to devoured
router.put("/api/burgers/:id", function(req, res) {
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

// router.get("/eat", function(req, res) {
//   res.render("eat");
// });
// router.get("/bigData", function(req, res) {
//   res.render("bigData");
// });

// router.post("/api/customers", function(req, res) {
//   console.log("adding to db:", req.body);
//   db.Customer.create(
//     {
//       customername: req.body.customername,
//       location: req.body.location
//     },
//     function(result) {
//       console.log(result);
//       res.json({ id: result.insertId });
//     }
//   );
// });

// router.get("/burgers", function(req, res) {
//   // get all burgers
//   const allBurgers = burger.findAll({
//     //include the customers
//     include: [
//       {
//         model: Customer,
//         as: "customers",
//         required: false,
//         //pass customer attributes we want to retrieve
//         attributes: ["id", "customername"],
//         through: {
//           model: BurgerCustomer
//         }
//       }
//     ]
//   });

//   return respondWith(res, 200);
// });

// router.get("/customers", function(req, res) {
//   // get all customers
//   const allCustomers = customer.findAll({
//     //include the burgers
//     include: [
//       {
//         model: Burger,
//         as: "burgers",
//         required: false,
//         //pass burger attributes we want to retrieve
//         attributes: ["id", "burgername"],
//         through: {
//           model: BurgerCustomer
//         }
//       }
//     ]
//   });

//   return respondWith(res, 200);
// });

module.exports = router;
