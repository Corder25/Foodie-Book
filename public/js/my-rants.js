$(document).ready(() => {
    var rantContainer = $(".rants");
    var theRants;

    $(document).on("click", "button.edit", handlePostEdit);

    var user = JSON.parse(localStorage.getItem("user"));
    var userId = user.id;


    $.get("/api/user/" + userId).then(data => {
        console.log(data);
        theRants = data;
        initializeRows();
    });

    // InitializeRows handles appending all of our constructed post HTML inside blogContainer
    function initializeRows() {
        rantContainer.empty();
        var rantsToAdd = [];
        for (var i = 0; i < theRants.length; i++) {
            rantsToAdd.push(createNewRow(theRants[i]));
        }
        rantContainer.append(rantsToAdd);
    }

    // This function constructs a post's HTML
    function createNewRow(rant) {
        var formattedDate = new Date(rant.createdAt).toLocaleDateString();
        var newPostCard = $("<div>");
        newPostCard.addClass("card");
        var newPostCardHeading = $("<div>");
        newPostCardHeading.addClass("card-header");
        var newPostTitle = $("<h2>");
        var newPostDate = $("<small>");
        var editBtn = $("<button>");
        editBtn.text("EDIT");
        editBtn.addClass("edit btn btn-info");
        var newPostAuthor = $("<h5>");
        var newPostCardBody = $("<div>");
        newPostCardBody.addClass("card-body");
        var newPostBody = $("<p>");
        newPostTitle.text(rant.restaurant_name + " ");
        newPostBody.text(rant.body);
        newPostDate.text(formattedDate);
        newPostTitle.append(newPostDate);
        newPostCardHeading.append(newPostTitle);
        newPostCardHeading.append(editBtn);
        newPostCardHeading.append(newPostAuthor);
        newPostCardBody.append(newPostBody);
        newPostCard.append(newPostCardHeading);
        newPostCard.append(newPostCardBody);
        newPostCard.data("rant", rant);
        return newPostCard;
    }

    function handlePostEdit() {
        var currentRant = $(this)
          .parent()
          .parent()
          .data("rant");
        window.location.href = "/rant?rant_id=" + currentRant.id;
      }


});