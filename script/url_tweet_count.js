var UrlTweetCount=function(){
  $.getJSON('http://api.twitter.com/1/account/rate_limit_status.json?callback=?', {}, function(json){
    var remaining_hits=json.remaining_hits;

//remaining_hits=10

    if(0<remaining_hits){
      var entry,sb,linkObj,link,objects={};
      $('div.post.hentry').each(
        function(){
          entry=$(this);
          sb = entry.find('.post-footer .post-share-buttons .share-button.sb-twitter');
          if(0<sb.length){
            linkObj=entry.find('h3.post-title > a');
            link = (0<linkObj.length) ? linkObj.attr('href').bloggerURLNormalize() : document.location.href.replace(document.location.search,'').replace(document.location.hash,'').replace(/:\/\/logroid\.blogspot\.jp\//,'://logroid.blogspot.com/');
//sb.after( $('<div>').addClass('count-balloon').append($('<a>').text("1000").attr('target','_blank').attr('href','https://twitter.com/#!/search/realtime/' + encodeURIComponent(link))) );
            objects[link]=sb;
            $.getJSON('http://urls.api.twitter.com/1/urls/count.json?url='+link+'&callback=?', {}, function(json){
              if( 0<json.count ){
                var u=json.url.replace(/\/$/,'');
                objects[u].after( $('<div>').addClass('count-balloon').append($('<a>').text(json.count).attr('target','_blank').attr('href','http://twitter.com/#!/search?q=' + encodeURIComponent(u))) );
              }
            });
          }
        }
      );
    }
  });
};