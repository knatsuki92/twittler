    
$(document).ready(function(){
  var $TweetBox = $('.TweetBox').html(""),
      LastIndex;

  var createTweetMsg = function(tweet){
  //This function creates and formats the <div> rendered in html for each tweet.  
        var $tweet = $('<div class = "tweet"></div>'),
            $user =  $('<div class = "user"></div>'),
            $message = $('<div class = "message"></div>'),
            $createdAt = $('<div class = "createdAt"></div>');

        //format 'createdAt' date to be viewer-friendly
        var dateFormatted = tweet.created_at.getHours() + ':' + tweet.created_at.getMinutes() + ' ' 
                            + tweet.created_at.getMonth() + '/' + tweet.created_at.getDate() + '/' + tweet.created_at.getFullYear();

        //render to html view
        $user.html('<button class = ' + tweet.user + '> @' + tweet.user + '</button>');
        $message.text(tweet.message);
        $createdAt.text('created at ' + dateFormatted);

        $tweet.append($user).append($message).append($createdAt);

        return $tweet;
  };

  var displayAllTweets = function(){
  //initialization that renders all existing tweets in 'streams' object. 
    $TweetBox.empty();

    var index = streams.home.length - 1;
    
    LastIndex = index;

    while(index >= 0){
      var tweet = streams.home[index],
          $tweet = createTweetMsg(tweet);
      
      $tweet.appendTo($TweetBox);
      index -= 1;

    createFilterLinks();
    }
  };

   var filterByUser = function(event){
  //This function filters the tweets by user　in .TweetBox.
   var user = event.data.user;

   $TweetBox.empty();

    var index = streams.users[user].length - 1;

    while(index >= 0){
      var tweet = streams.users[user][index],
        $tweet = createTweetMsg(tweet);

      $tweet.appendTo($TweetBox);
      index -= 1;

    }
  };

  var createFilterLinks = function(){
    for(var user in streams.users){
    $('button.'+ user).on('click', {user: user}, filterByUser);
    }
  };


  displayAllTweets();
  $('#showAll').on('click', displayAllTweets);


  //New Tweet
  $('form').on('submit', function(event){
    event.preventDefault(); //This prevents the default form-submission functionality.
   // alert('it works!');
    var $newTwittlerName = $('#twittlerName'),
        $newTwittlerComm = $('#twittlerComment');
    //the constructor for 'tweet' object.
    var newTweet = {};
        newTweet.user = $newTwittlerName.val();
        newTweet.message = $newTwittlerComm.val();
        newTweet.created_at = new Date();

    //creates a new array if it's a new user.
    if(streams.users[newTweet.user] === undefined){
      streams.users[newTweet.user] = [];
    }
    addTweet(newTweet);
    displayAllTweets();

    //clear form once it's submitted.
    $newTwittlerName.val("");
    $newTwittlerComm.val("");
  });

/*
  $('form').submit( function(event){
    alert('it works!');
    event.preventDefault;
    console.log(event);
  });
*/
});