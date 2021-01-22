$(document).ready(() => {

    var blogContainer = $(".blog-container");
    // Click events for the edit and delete buttons
    // $(document).on("click", "button.edit", handlePostEdit);
    // Variable to hold our posts
    var rants;
  
    // The code below handles the case where we want to get blog posts for a specific author
    // Looks for a query param in the url for author_id
    var url = window.location.search;
    var userId;

    $.get("/api/user_data").then(data => {
        user_id=data.id;
        getRants(user_id); 
      });

    // if (url.indexOf("?user=") !== -1) {
    //   userId = url.split("=")[1];
    //   getRants(userId);
    // }
    // // If there's no authorId we just get all posts as usual
    // else {
    //   getRants();
    //


    // This function grabs posts from the database and updates the view
    function getRants(user) {
      
      $.get("/api/rants/:id", function(data) {
        console.log("Rants", data);
        rant = data;
        initializeRows();
      });
    }

  // InitializeRows handles appending all of our constructed post HTML inside blogContainer
  function initializeRows() {
    blogContainer.empty();
    var rantsToAdd = [];
    for (var i = 0; i < rant.length; i++) {
      rantsToAdd.push(createNewRow(rant[i]));
    }
    blogContainer.append(rantsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(rant) {
    var formattedDate = new Date(rant.createdAt).toLocaleDateString();
    var newRantCard = $("<div>");
    newRantCard.addClass("card");
    var newRantCardHeading = $("<div>");
    newRantCardHeading.addClass("card-header");
    // var deleteBtn = $("<button>");
    // deleteBtn.text("x");
    // deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var newRantTitle = $("<h2>");
    var newRantDate = $("<small>");
    var newRantUser = $("<h5>");
    // newRantUser.text("Written by: " + Rant.User.name);
    newRantUser.css({
      float: "right",
      color: "blue",
      "margin-top":
      "-10px"
    });
    var newRantCardBody = $("<div>");
    newRantCardBody.addClass("card-body");
    var newRantBody = $("<p>");
    newRantTitle.text(rant.restaurant_name + " ");
    newRantBody.text(rant.body);
    newRantDate.text(formattedDate);
    newRantTitle.append(newRantDate);
    // newPostCardHeading.append(deleteBtn);
    newRantCardHeading.append(editBtn);
    newRantCardHeading.append(newRantTitle);
    newRantCardHeading.append(newRantUser);
    newRantCardBody.append(newRantBody);
    newRantCard.append(newRantCardHeading);
    newRantCard.append(newRantCardBody);
    newRantCard.data("rant", rant);
    return newRantCard;
  }

})