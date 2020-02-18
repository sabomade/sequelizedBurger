// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(document).ready(function() {
  var customerID;
  var burgerID;
  var locationID;

  var url = window.location.search;

  //grab customer, burger, or location ID
  if (url.indexOf("?location_id=") !== -1) {
    locationID = url.split("=")[1];
  } else if (url.indexOf("?customer_id=") !== -1) {
    customerID = url.split("=")[1];
  } else if (url.indexOf("?burger_id=") !== -1) {
    burgerID = url.split("=")[1];
  }

  // listener for submit new burger suggestion form
  $("#create-form").on("submit", function(event) {
    event.preventDefault();
    var newBurger = {
      creator: $("#suggest-name")
        .val()
        .trim(),
      burgername: $("#burger-to-eat")
        .val()
        .trim()
    };

    //send POST request
    $.post("/api/burgers", newBurger, () => {
      location.reload();
    });
  });

  // // listener for try it button
  // $("#try-burger").on("click", function(event) {
  //   event.preventDefault();
  //   $("#ate-burger").modal("toggle");
  // });

  // //listener for modal submit button
  // $("#create-customer").on("submit", function(event){
  //   event.preventDefault();
  //   var newCustomer = {
  //     customer_name:$("#customer-who-ate").val().trim(),
  //     location:$("#ate-at-location:selected").val()
  //   }

  // })

  // $(".delete-burger").on("click", function(event) {
  //   var id = $(this).data("id");

  //   // Send the DELETE request.
  //   $.ajax("/api/burgers/" + id, {
  //     type: "DELETE"
  //   }).then(
  //     function() {
  //       console.log("deleted burger", id);
  //       // Reload the page to get the updated list
  //       location.reload();
  //     }
  //   );
  // });

  // $(".clear-table").on("click", function(event) {

  //   // Send the DELETE request.
  //   $.ajax("/api/burgers/all", {
  //     type: "DELETE"
  //   }).then(
  //     function() {
  //       console.log("table has been cleared");
  //       // Reload the page to get the updated list
  //       location.reload();
  //     }
  //   );
  // });
});
