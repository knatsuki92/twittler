    
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

   console.log('filterByUser invoked');

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


});