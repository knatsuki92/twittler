    
$(document).ready(function(){
  var $TweetBox = $('.TweetBox'),

      createTweetMsg = function(tweet){
        //This function creates and formats the <div> rendered in html for each tweet.  
        var $tweet = $('<div class = "tweet"></div>'),
            $user =  $('<div class = "user"></div>'),
            $message = $('<div class = "message"></div>'),
            $createdAt = $('<div class = "createdAt"></div>');

        //format 'createdAt' date to be viewer-friendly
        var dateFormatted = tweet.created_at.getHours() + ':' + tweet.created_at.getMinutes() + ' ' 
                            + tweet.created_at.getMonth() + '/' + tweet.created_at.getDate() + '/' + tweet.created_at.getFullYear();

        //render to html view
        $user.text('@' + tweet.user);
        $message.text(tweet.message);
        $createdAt.text('created at ' + dateFormatted);

        $tweet.append($user).append($message).append($createdAt);

        return $tweet;
      };

  //initialization that renders all existing tweets in 'streams' object. 
  var index = streams.home.length - 1,
      lastIndex = index;

  while(index >= 0){
    var tweet = streams.home[index],
        $tweet = createTweetMsg(tweet);
    
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
      var $tweet = createTweetMsg(tweet);
      $tweet.prependTo($TweetBox);
      refreshIndex -= 1;
    }
  };

  $('#refresh').on('click', refreshTweets);

});