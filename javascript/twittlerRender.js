    
$(document).ready(function(){
  var $TweetBox = $('.TweetBox'),

      CreateTweetMsg = function(tweet){
        //This function creates and formats the <div> rendered in html for each tweet.  
        var $tweet = $('<div class = "tweet"></div>'),
            $user =  $('<div class = "user"></div>'),
            $message = $('<div class = "message"></div>'),
            $createdAt = $('<div class = "createdAt"></div>');

        $user.text('@' + tweet.user);
        $message.text(tweet.message);
        $createdAt.text('created at ' + tweet.created_at);
        $tweet.append($user).append($message).append($createdAt);
        //$tweet.text('@' + tweet.user + ': ' + tweet.message);

        return $tweet;
      };

  //initialization that renders all existing tweets in 'streams' object. 
  var index = streams.home.length - 1,
      lastIndex = index;

  while(index >= 0){
    var tweet = streams.home[index],
        $tweet = CreateTweetMsg(tweet);
    
    $tweet.appendTo($TweetBox);
    index -= 1;
  }


  var refreshTweets = function(){
    //function that updates the .TweetBox with new tweets. 
    var prevIndex = lastIndex,
        refreshIndex = streams.home.length - 1;

    lastIndex = refreshIndex;

    while(refreshIndex > prevIndex){
      var tweet = streams.home[refreshIndex];
      console.log(tweet);
      var $tweet = CreateTweetMsg(tweet);
      $tweet.prependTo($TweetBox);
      refreshIndex -= 1;
    }
  };

  $('#refresh').on('click', refreshTweets);

});