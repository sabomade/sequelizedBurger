var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var db = require("../models");

// Create all our routes and set up logic within those routes where required.
// router.get("/", function(req, res) {
//   res.render("index");
// });
router.get("/", function(req, res) {
  db.Burger.findAll().then(function(data) {
    var hbsObject = {
      burgers: data
    };
    //console.log("obj", hbsObject);
    res.render("index", hbsObject);
  });

  db.Customer.findAll().then(function(data) {
    var hbsObject2 = {
      customers: data
    };
    res.render("index", hbsObject2);
  });
});

// router.get("/eat", function(req, res) {
//   res.render("eat");
// });
// router.get("/bigData", function(req, res) {
//   res.render("bigData");
// });

router.post("/api/burgers", function(req, res) {
  console.log("adding to db:", req.body);
  db.Burger.create(
    {
      creator: req.body.creator,
      burgername: req.body.burgername
    },
    function(result) {
      console.log(result);
      res.json({ id: result.insertId });
    }
  );
});

router.post("/api/customers", function(req, res) {
  console.log("adding to db:", req.body);
  db.Customer.create(
    {
      customername: req.body.customername,
      location: req.body.location
    },
    function(result) {
      console.log(result);
      res.json({ id: result.insertId });
    }
  );
});

router.get("/burgers", function(req, res) {
  // get all burgers
  const allBurgers = burger.findAll({
    //include the customers
    include: [
      {
        model: Customer,
        as: "customers",
        required: false,
        //pass customer attributes we want to retrieve
        attributes: ["id", "customername"],
        through: {
          model: BurgerCustomer
        }
      }
    ]
  });

  return respondWith(res, 200);
});

router.get("/customers", function(req, res) {
  // get all customers
  const allCustomers = customer.findAll({
    //include the burgers
    include: [
      {
        model: Burger,
        as: "burgers",
        required: false,
        //pass burger attributes we want to retrieve
        attributes: ["id", "burgername"],
        through: {
          model: BurgerCustomer
        }
      }
    ]
  });

  return respondWith(res, 200);
});

// NEED TO REDO ALL BELOW THIS POINT

// router.post("/api/burgers", function(req, res) {
//   burger.create({
//     ["burger_name", "devoured"],
//     [req.body.burger_name, req.body.devoured]},
//     function(result) {
//       // Send back the ID of the new quote
//       res.json({ id: result.insertId });
//     }
//   );
// });

// router.put("/api/burgers/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   burger.update(
//     {
//       devoured: req.body.devoured
//     },
//     condition,
//     function(result) {
//       if (result.changedRows == 0) {
//         // If no rows were changed, then the ID must not exist, so 404
//         return res.status(404).end();
//       } else {
//         res.status(200).end();
//       }
//     }
//   );
// });

// router.delete("/api/burgers/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   if (req.params.id === "all") {
//     burger.truncate("burgers", function(result) {
//       if (result.affectedRows === 0) {
//         // If no rows were changed, then the ID must not exist, so 404
//         return res.status(404).end();
//       } else {
//         return res.status(200).end();
//       }
//     });
//   } else {
//     burger.delete(condition, function(result) {
//       if (result.affectedRows == 0) {
//         // If no rows were changed, then the ID must not exist, so 404
//         return res.status(404).end();
//       } else {
//         res.status(200).end();
//       }
//     });
//   }
// });

// Export routes for server.js to use.
module.exports = router;
