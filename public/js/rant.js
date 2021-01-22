// restaurant_name, body, rating, user_id

$(document).ready(() => {
    // Getting references to our form and inputs
    const rantForm = $("form.rant-form");
    const restaurantNameInput = $("#restaurant-name");
    const bodyInput = $("#body");
    const ratingInput = $("#rating");
    const submitBtn = $("#submit-btn");
  
    // When the form is submitted, we validate there's an email and password entered
    rantForm.on("submit", event => {
      event.preventDefault();
      const rantData = {
          restaurant_name: restaurantNameInput.val().trim(),
          body: bodyInput.val().trim(),
          rating: ratingInput.val(),
          user_id: 1
      };

      if (!rantData.restaurant_name || !rantData.body || !rantData.rating) {
        return;
      }

      console.log(rantData);

      //postRant(rantData);
  
  
      // If we have an email and password we run the loginUser function and clear the form
      //restaurantNameInput.val("");
      //bodyInput.val("");
    });
  
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    // function postRant(restaurant_name, body, rating, user_id) {
    //   $.post("/api/rants", {
    //     email: email,
    //     password: password
    //   })
    //     .then(() => {
    //       window.location.replace("/my-rants");
    //       // If there's an error, log the error
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }
});