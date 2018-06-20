function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}



function createTweetElement (dataObj) {
  let $twe = $(`
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

  return $twe

}

function renderTweets(dataArr) {
  dataArr.reverse();
  let $tweets = dataArr.map(obj => createTweetElement(obj));
  $("#tweet-container").empty();
  $(`#tweet-container`).append($tweets);
}

$(document).ready(function() {

  function loadTweets() {
    $.ajax ({
      url: '/tweets',
      method: 'GET',
    }).done(function (dataJSON) {
      renderTweets(dataJSON);
    })
  }

  loadTweets();

  $("#new-tweet-form").on("submit", function (event) {
    event.preventDefault();
    $(this).siblings(".errors").empty();


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
        $(".new-tweet textarea").val("");
        loadTweets();
      });
    }

  });

});



