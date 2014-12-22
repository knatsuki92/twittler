    
$(document).ready(function(){
  var $TweetBox = $('.TweetBox'),
      //This function creates and formats the <div> rendered in html for each tweet.  
      CreateTweetMsg = function(tweet){
        var $tweet = $('<div></div>');
        $tweet.text('@' + tweet.user + ': ' + tweet.message);

        return $tweet;

      };

  var index = streams.home.length - 1,
      lastIndex = index;

  while(index >= 0){
    var tweet = streams.home[index],
        $tweet = CreateTweetMsg(tweet);
    
    $tweet.appendTo($TweetBox);
    index -= 1;
  }

  //function that updates the page with new tweets. 
  var refreshTweets = function(){
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