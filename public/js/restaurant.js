$(document).ready(() => {
    var rantContainer = $(".rants");
    var theRants;

    var url = window.location.search;
    var resName, resNameSplit;
    /*
    $("#burger").val().trim(),
    resName = resName.val().trim()
    */

    if (url.indexOf("?name=") !== -1) {
        resName = url.split("=")[1];
        
        //resNameSplit
    }

    $.get("/api/restaurant/" + resName).then(data => {
        console.log(data);
        $(".restaurant").text(data[0].restaurant_name.toUpperCase());
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
        var newPostAuthor = $("<h5>");
        newPostAuthor.text("Written by: " + rant.User.username);
        newPostAuthor.css({
            float: "right",
            color: "blue",
            "margin-top": "-10px"
        });
        var newPostCardBody = $("<div>");
        newPostCardBody.addClass("card-body");
        var newPostBody = $("<p>");
        newPostTitle.text(rant.restaurant_name + " ");
        newPostBody.text(rant.body);
        newPostDate.text(formattedDate);
        newPostTitle.append(newPostDate);
        newPostCardHeading.append(newPostTitle);
        newPostCardHeading.append(newPostAuthor);
        newPostCardBody.append(newPostBody);
        newPostCard.append(newPostCardHeading);
        newPostCard.append(newPostCardBody);
        newPostCard.data("rant", rant);
        return newPostCard;
    }
});