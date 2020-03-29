// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(document).ready(function() {
  // listener for submit new burger suggestion form
  $("#create-form").on("submit", function(event) {
    event.preventDefault();
    var newBurger = {
      creator: $("#suggest-name")
        .val()
        .trim(),
      burgername: $("#burger-to-eat")
        .val()
        .trim(),
      devoured: false
    };

    //send POST request to create new burger
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(function(result) {
      console.log("created new burger");
      // Reload the page to get the updated list
      location.reload();
      // window.location.href = "/";
    });
  });

  //======for devouring burger, no customer : is NOT working =====
  // $(".eatBurger").on("click", function(event) {
  //   event.preventDefault();
  //   var id = $(this).data("id");
  //   var devState = {
  //     devoured: 1
  //   };

  //   $.ajax("/api/burgers/" + id, {
  //     type: "PUT",
  //     data: devState
  //   }).then(function() {
  //     console.log("Burger eaten");
  //     location.reload();
  //   });
  // });

  //============== for logging customer eating: is NOT working =======

  //listener for try it button
  $("button#try-burger").on("click", function(event) {
    var temp = $(this)
      .parent()
      .siblings(".custName")
      .find("input")
      .val()
      .trim();
    event.preventDefault();
    var newCustomer = {
      customername: temp
      // location: $("#ate-at-location:selected").val()
    };
    var id = $(this).data("id");
    console.log("id", id);
    // console.log("newCustomer", newCustomer);

    //send POST request
    $.ajax("/api/burgers/" + id, {
      type: "POST",
      // boolean: 1, customer: newCustomer
      data: newCustomer
    }).then(function() {
      console.log("created new customer");
      // Reload the page to get the updated list
      location.reload();
    });
    $("#customer-who-ate").val("");
  });
});
