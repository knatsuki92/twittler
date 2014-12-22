    
$(document).ready(function(){
  var $body = $('body');
  //$body.html('');

  var index = streams.home.length - 1,
      lastIndex = index;


  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($body);
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
      var $tweet = $('<div></div>');
      $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.appendTo($body);
      refreshIndex -= 1;
    }
  };

  $('#refresh').on('click', refreshTweets);

});