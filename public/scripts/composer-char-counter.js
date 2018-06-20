$(document).ready(function() {
  $(".new-tweet textarea").on("keyup", function () {
    let charsLeft = 140 - $(this).val().length;

    $(this).siblings(".counter").text(charsLeft);
    $(this).siblings(".counter").toggleClass("red-counter", charsLeft < 0);
  });
});