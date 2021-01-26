$(document).ready(() => {
  // Getting references to our form and inputs
  const rantForm = $("form.rant-form");
  const restaurantNameInput = $("#restaurant-name");
  const bodyInput = $("#body");
  const ratingInput = $("#rating");
  const submitBtn = $("#submit-btn");
  var updating = false;

  let user_id;
  $.get("/api/user_data").then(data => {
      user_id = data.id;
  });

  var url = window.location.search;
  var rantId;

  if (url.indexOf("?rant_id=") !== -1) {
      rantId = url.split("=")[1];
      getRantData(rantId);
      // console.log(rantId, updating);
      updating = true;
  }



  // When the form is submitted, we validate there's an email and password entered
  rantForm.on("submit", event => {
      event.preventDefault();
      console.log(typeof bodyInput)
      const rantData = {
          restaurant_name: restaurantNameInput.val().trim(),
          body: bodyInput.val().trim(),
          rating: ratingInput.val(),
          user_id: user_id,
          UserId: user_id
      };

      if (!rantData.restaurant_name || !rantData.body || !rantData.rating) {
          return;
      }

      if (updating) {
          rantData.id = rantId;
          console.log(rantData);
          updateRant(rantData);
      } else {
          submitRant(rantData.restaurant_name, rantData.body, rantData.rating, rantData.user_id);
      }
    
      // If we have an email and password we run the loginUser function and clear the form
      restaurantNameInput.val("");
      bodyInput.val("");
  });

  function getRantData(id) {
      $.get("/api/rant/" + id, function(data) {
          if (data) {
              console.log(data);
              restaurantNameInput.val(data.restaurant_name);
              bodyInput.val(data.body);
              ratingInput.val(data.rating);
          }
      });
  }

  // Update a given post, bring user to the blog page when done
  function updateRant(rant) {
      $.ajax({
          method: "PUT",
          url: "/api/rants",
          data: rant
      }).then(function(res) {
          window.location.replace("/my-rants");
      });
  }

  function submitRant(res_name, body, rating, user_id) {
      $.post("/api/rants", {
          restaurant_name: res_name,
          body: body,
          rating: rating,
          user_id: user_id,
          UserId: user_id
      }).then(() => {
          window.location.replace("/my-rants");
      }).catch(err => {
          console.log(err);
      });
  }
});