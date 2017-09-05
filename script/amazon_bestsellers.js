var AMAZON_AFFILIATE_CODE="logroid-22";
var AmazonBestsellers=function(selector,url,opt){
  if (selector) {
    var target=$(selector);
    if (0<target.length && url) {
      opt = $.extend({
        num: 10,
        max: 20,
        filter: null,
        query: new Date().getTime()
      }, opt);
      url+="?tag="+AMAZON_AFFILIATE_CODE+"&"+opt.query;
      var feed = new google.feeds.Feed(url);
      feed.setNumEntries(opt.max);
      feed.load(function(res){
        if(!res.error){
          var container=$('<dl>');
          var ent,con=$('<div>'),img,newImg,title,stars,count=0;
          for(var i=0,maxi=res.feed.entries.length; i<maxi; i++){
            ent=res.feed.entries[i];
            if(opt.filter){
              if (!opt.filter.test(ent.title)){
                continue;
              }
            }
            con.empty().html(ent.content);
            img=con.find('a>img:first');
            // max-widthで縦横比固定でリサイズするため、width、heigthプロパティを削除
            newImg=$('<img>').attr('src',img.attr('src').replace(/PIsitb-sticker-arrow-dp.+(\.[a-z]+)$/,"$1"));
            
            stars=con.find("img[src*='/stars-']");
            title=ent.title.replace(/^#\d+:\s+/,'');
            if(stars && stars.attr('src')){
              newImg
                .css('background-image','url("'+stars.attr('src')+'")')
                .css('border-bottom-width','4px')
                .css('padding-bottom','14px');
            };
            
            container
              .append($('<dt>').append($('<a>').attr('target','_blank').attr('title',title).attr('href',ent.link).text(title)))
              .append(
                $('<dd>').append($('<a>').attr('target','_blank').attr('title',title).attr('href',ent.link).append(newImg)
                )
              );
            
            count++;
            // 規定値を超えたらbrak
            if(opt.num<=count){
              break;
            }
          };
          if(0<count){
            target.hide().empty().append(container).fadeIn("slow");
          }
        }else{
          new Error(res.error.code + ":" + res.error.message);
        }
      });
    }
  };
};