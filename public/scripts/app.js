/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];



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
              <p>${dataObj.content.text}</p>
            </div>
            <footer>
              <p>${dataObj.created_at}</p>
              <span class="icons"><i class="fa fa-flag"></i><i class="fa fa-retweet"></i><i class="fa fa-heart"></i>
              </span>
            </footer>
          </article>`);

    return $twe

  }

  function renderTweets(dataArr) {
    let $tweets = dataArr.map(obj => createTweetElement(obj));
    $(`#tweet-container`).append($tweets);
  }

$(document).ready(function() {
  renderTweets(data);

  $("#new-tweet-form").on("submit", function (event) {
    event.preventDefault();

    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize()
    }).done(function() {
      $(".new-tweet textarea").val("");
    })

  });


});



