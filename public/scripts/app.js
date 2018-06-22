// function to prevent XSS
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// function to create tweet element given objext with info about tweet
function createTweetElement (dataObj) {
  let $tweetElement = $(`
        <article class="tweet">
          <header>
            <div class="pic-and-name">
              <img class="profile-pic" src=${dataObj.user.avatars.small} alt="profile picture">
              <h2 class="name">${dataObj.user.name}</h2>
            </div>
            <p class="handle">${dataObj.user.handle}</p>
          </header>
          <div class="tweet-content">
            <p>${escape(dataObj.content.text)}</p>
          </div>
          <footer>
            <p>${moment(dataObj.created_at).fromNow()}</p>
            <span class="icons"><i class="fa fa-flag"></i><i class="fa fa-retweet"></i><i class="fa fa-heart"></i>
            </span>
          </footer>
        </article>`);
  return $tweetElement
}

// function to create tweet element for each tweet in db and render
function renderTweets(dataArr) {
  dataArr.reverse();
  let $tweets = dataArr.map(obj => createTweetElement(obj));
  $("#tweet-container").empty();
  $(`#tweet-container`).append($tweets);
}


$(document).ready(function() {

  // function to load all tweets
  function loadTweets() {
    $.ajax ({
      url: '/tweets',
      method: 'GET',
    }).done(function (dataJSON) {
      renderTweets(dataJSON);
    })
  }

  // call function to load all tweets
  loadTweets();

  // handler for clicking submit on the new tweet form
  $("#new-tweet-form").on("submit", function (event) {
    event.preventDefault();
    // empty errors div
    $(this).siblings(".errors").empty();

    // send error if the text area is empty or too long, otherwise post the tweet
    if($(".new-tweet textarea").val().trim() === "") {
      $emptyError = $("<p class='emptyError'>Tweet is empty!</p>")
      $(".new-tweet .errors").append($emptyError);
    } else if($(".new-tweet textarea").val().length > 140) {
      $tooLong = $("<p class='tooLong'>Tweet is too long!</p>")
      $(".new-tweet .errors").append($tooLong);
    } else {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize()
      }).done(function() {
        // after posting the tweet, clear the text area, set the counter to 140, render the new tweets
        $(".new-tweet textarea").val("");
        $(".new-tweet .counter").text("140");
        loadTweets();
      });
    }
  });

  // event handler for clicking the compose button
  $("#nav-bar .compose" ).on("click", function (event) {
    // when button is pressed, the new tweet container sides up and down, and focus is on the textarea
    $(".new-tweet").slideToggle( "slow" );
    $(".new-tweet textarea").focus();
  });
});



