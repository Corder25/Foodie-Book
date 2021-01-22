$(document).ready(() => {
  // getting refs to our buttons
  const rantBtn = $("#rant-btn");
  const myRantsBtn = $("#my-rants-btn");
  const allRantsBtn = $("#all-rants-btn");

  rantBtn.on("click", function() {
    window.location.replace("/rant");
  });

  myRantsBtn.on("click", function() {
    window.location.replace("/my-rants");
  });

  allRantsBtn.on("click", function() {
    window.location.replace("/all-rants");
  });

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });
});