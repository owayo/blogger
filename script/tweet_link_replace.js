// Twitterのリンクを変更する
var TweetLinkReplace=function(){
  $('div.post.hentry').each(
    function(){
      var entry,sb,titleObj,entryTitle,linkObj,entryLink,hashTagObj,entryHashtag=[],tweetLink;
      entry=$(this);
      sb = entry.find('.post-footer .post-share-buttons .share-button.sb-twitter');
      if(0<sb.length){
        titleObj=entry.find('h3.post-title');
        linkObj=titleObj.find('> a');
        hashTagObj=entry.find('#twitter-hashtag');
        if(0<hashTagObj.length){
          entryHashtag=$.map(entry.find('#twitter-hashtag').val().split(','),function (m){m=m.strip();if(m != ""){return m}});
        };
        if(0<titleObj.length){
          entryTitle = (0<linkObj.length) ? linkObj.text().strip() : titleObj.text().strip();
          entryTitle=entryTitle.replace(/\[|\]/g,'');
          entryLink = (0<linkObj.length) ? linkObj.attr('href').bloggerURLNormalize() : document.location.href.replace(document.location.search,'').replace(document.location.hash,'').replace(/:\/\/logroid\.blogspot\.jp\//,'://logroid.blogspot.com/');
          tweetLink = 'https://twitter.com/intent/tweet?url='+ encodeURIComponent(entryLink) +'&via=logroid&text='+ encodeURIComponent("["+entryTitle+"]");
          if(0<entryHashtag.length){
            tweetLink += '&hashtags='+ $.map(entryHashtag,function(m){return encodeURIComponent(m);}).join(',');
          };
          sb.attr('href',tweetLink);
        }
      }
    }
  );
};