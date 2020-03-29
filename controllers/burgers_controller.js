var express = require("express");
var router = express.Router();
var db = require("../models");

//======for devouring a burger, no customer : CREATE works, nothing else====
// //get all burgers from db
// router.get("/", function(req, res) {
//   db.Burger.findAll({}).then(function(data) {
//     var hbsObj = {
//       burgers: data
//     };
//     console.log(hbsObj);
//     res.render("index", hbsObj);
//   });
// });

// //create burger, add to db
// router.post("/api/burgers", function(req, res) {
//   console.log("adding to db:", req.body);
//   db.Burger.create({
//     creator: req.body.creator,
//     burgername: req.body.burgername
//   }).then(function(result) {
//     // Send back the ID of new burger
//     res.json({ id: result.insertId });
//     res.redirect("/");
//   });
// });

// //update a specific burger
// router.put("/api/burgers/:id", function(req, res) {
//   //console.log("req.body", req.body);
//   var condition = "id = " + req.params.id;

//   //console.log("condition", condition);
//   db.Burger.update(
//     {
//       devoured: req.body.devoured
//     },
//     {
//       where: {
//         id: condition
//       }
//     }
//   ).then(function(result) {
//     if (result.changedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// //delete a specific burger from db
// router.delete("/api/burgers/:id", function(req, res) {
//   var condition = "id = " + req.params.id;
//   console.log("condition", condition);

//   db.Burger.deleteOne(condition, function(result) {
//     if (result.changedRows === 0) {
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

//============== Not Working - To track Customer who ate ===============
//load index page with all burgers in asencding order by name
router.get("/", function(req, res) {
  db.Burger.findAll({
    order: [["id", "ASC"]],
    include: [{ model: db.Customer }]
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
    res.redirect("/");
  });
});

//update burger
function burgerUpdate(custName, burgId, data) {
  db.Customer.findOne({
    where: {
      customername: custName
    }
  }).then(function(dbCust) {
    var id = dbCust.id;
    db.Burger.update(
      {
        devoured: true,
        CustomerId: id
      },
      {
        where: {
          id: burgId
        }
      }
    ).then(function(result) {
      data.redirect("/");
    });
  });
}

//update burger to devoured
router.post("/api/burgers/:id", function(req, res) {
  var custName = req.body.customername;
  var burgerId = req.params.id;
  var data = res;
  db.Customer.findAll({}).then(function(dbCust) {
    var flag = false;
    for (let index = 0; index < dbCust.length; index++) {
      if (custName === dbCust[index].customername) {
        flag = true;
      } else {
        console.log("Not a Match");
      }
    }
    if (!flag) {
      db.Customer.create({
        customername: custName
      }).then(function(dbCreate) {
        burgerUpdate(custName, burgerId, data);
      });
    } else {
      burgerUpdate(custName, burgerId, data);
    }
  });
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
