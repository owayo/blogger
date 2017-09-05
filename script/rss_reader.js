var RssReader=function(selector,url,opt){
  var me=this;
  if (selector) {
    var target=$(selector);
    if (0<target.length && url) {
      opt = $.extend({
        num: 10,
        max: 20,
        filter: null,
        urlRemoveRegexp: null,
        keyFunction:function(){
          return new Date().getTime();
        },
        expireFunction:function(dt){
          var r=false;
          if( ((dt).to_int() + 86400000) < new Date().getTime() ){
            r=true;
          };
          return r;
        }
      }, opt);
      me.insertTarget=target;
      var urlKey=url.replace(/\?.+$/,''),
      storageDataExist=false;
      if( StorageKeyExist(["rss-"+urlKey]) ){
        var rssData=StorageLoad("rss-"+urlKey);
        if( !opt.expireFunction(rssData.key) ){
//console.info("Storage data found.");
          storageDataExist=true;
          me.data = eval(rssData.data);
          me.draw();
        }else{
          StorageRemove(["rss-"+urlKey]);
        }
      };
      if(!storageDataExist){
console.info("Storage data not found.");
console.info(url)
        var feed = new google.feeds.Feed(url);
        feed.setNumEntries(opt.max);
        feed.load(function(res){
          var now=new Date(),
          yesterday=now.setTime(new Date().getTime() - 86400000);
          if(!res.error){
            var r=[],ent,etitle,elink,pubDate,padDate;
            for(var i=0,maxi=res.feed.entries.length; i<maxi; i++){
              ent=res.feed.entries[i];
              if(opt.filter){
                if (!opt.filter.test(ent.title)){
                  continue;
                }
              };
              etitle=ent.title.replace(/^#\d+:\s+/,'');
              console.info(etitle);
              elink=ent.link;
              if(opt.urlRemoveRegexp){
                elink=elink.replace(opt.urlRemoveRegexp,'');
              };
              pubDate=new Date(ent.publishedDate),
              padDate=pubDate.getPaddingDate();
              r.push( { title:etitle, link:elink, publishedDate:pubDate, paddingDate:padDate } );
              // 規定値を超えたらbreak
              if(opt.num<=r.length){
                break;
              }
            };
            me.data=r;
            me.draw();
            StorageSave("rss-"+urlKey, r, opt.keyFunction());
          }else{
            new Error(res.error.code + ":" + res.error.message);
          }
        });
      };
    };
  };
};
RssReader.prototype.draw=function(){
  var me=this;
  if(0<me.data.length){
    var now=new Date(),
    yesterday=now.setTime(new Date().getTime() - 86400000),
    container=$('<dl>'),
    t="",
    dt=null;
    $.each(me.data,function(i,v){
      t='_blank';
      if((v.link).is_logroid()){t='_self';};
      dt=$('<dt>').append($('<a>').attr('target',t).attr('title',v.title).attr('href',v.link).text( v.paddingDate.year+"/"+v.paddingDate.month+"/"+v.paddingDate.day+" "+v.paddingDate.hour+":"+v.paddingDate.minute ));
      if(yesterday<v.publishedDate){
        dt.addClass('new');
      };
      container
        .append(dt)
        .append(
          $('<dd>').append($('<a>').attr('target',t).attr('title',v.title).attr('href',v.link).text(v.title))
      );
    });
    me.insertTarget.hide().empty().append(container).fadeIn("slow");
  }
};