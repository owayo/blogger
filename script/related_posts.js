var RELATED_MAX=5,
feeds=[];
var rpSelf=null;
var RelatedPosts=function(){
  rpSelf=this;
  var entries=$('div.post.hentry');
  if(0<entries.length){
    rpSelf.entries=[];
    entries.each(function(){rpSelf.entries.push($(this))});
    rpSelf.postsData={};
    rpSelf.postData=[];
    var now=new Date(),
    queryDate=new Date(now.getFullYear(),now.getMonth(),now.getDate(),now.getHours(),0,0);
    rpSelf.query=queryDate.getTime();
    rpSelf.get();
  }
};
RelatedPosts.prototype.get=function(){
  rpSelf=this;
  if(0<rpSelf.entries.length){
    var entry=rpSelf.entries.shift(),
    labels=rpSelf.getLabels(entry),
    related=entry.find('.post-related'),
    list=related.find('.list');
    rpSelf.postData=[];
    if(0<labels.length && 0<list.length){
      rpSelf.related=related;
      rpSelf.list=list;
      var link=entry.find('h3.post-title > a');
      rpSelf.link = (0<link.length) ? link.attr('href').bloggerURLNormalize() : document.location.href.replace(document.location.search,'').replace(document.location.hash,'').replace(/:\/\/logroid\.blogspot\.jp\//,'://logroid.blogspot.com/');
      rpSelf.getFeeds(labels);
    }else{
      rpSelf.get();
    }
  }
};
RelatedPosts.prototype.getLabels=function(obj){
  rpSelf=this;
  var l=[],
  lobj=obj.find('.post-footer .post-labels a[rel=tag]');
  if(0<lobj.length){
    l=$.map(lobj,function(m){return $(m).attr('href').split('/').pop();});
  }
  return l;
};
RelatedPosts.prototype.getFeeds=function(labels){
  rpSelf=this;
  if(0<labels.length){
    var l=labels.shift(),
    ent=null;
    if(!rpSelf.labelExist(l)){
      var feed = new google.feeds.Feed('http://logroid.blogspot.com/feeds/posts/default/-/'+l+'?'+rpSelf.query);
      feed.setNumEntries(RELATED_MAX+2);
      feed.load(function(res){
        if(!res.error){
          rpSelf.postsData[l]=[];
          var d=null;
          for(var i=0,maxi=res.feed.entries.length; i<maxi; i++){
            ent=res.feed.entries[i];
            if(ent.link!=""){
              d={title:ent.title,link:ent.link,date:new Date(ent.publishedDate)};
              rpSelf.postsData[l].push(d);
              if(rpSelf.link){
                if(rpSelf.link != ent.link){
                  rpSelf.pushPostData(d);
                }
              }else{
                rpSelf.pushPostData(d);
              }
            }
          }
        }
        rpSelf.getFeeds(labels);
      });
    }else{
      for(var i=0,maxi=rpSelf.postsData[l].length; i<maxi; i++){
        ent=rpSelf.postsData[l][i];
        if(rpSelf.link){
          if(rpSelf.link != ent.link){
            rpSelf.pushPostData(ent);
          }
        }else{
          rpSelf.pushPostData(ent);
        }
      }
      rpSelf.getFeeds(labels);
    }
  }else{
    rpSelf.insert();
  }
};
RelatedPosts.prototype.pushPostData=function(d){
  rpSelf=this;
  if(!rpSelf.postDataExist(d)){
    rpSelf.postData.push(d);
  }
};
RelatedPosts.prototype.postDataExist=function(d){
  rpSelf=this;
  var r=false;
  for(var i=0,maxi=rpSelf.postData.length; i<maxi; i++){
    if(d.link == rpSelf.postData[i].link){
      r=true;
      break;
    }
  };
  return r;
};
RelatedPosts.prototype.labelExist=function(l){
  rpSelf=this;
  return (rpSelf.postsData[l]) ? true : false;
};
RelatedPosts.prototype.insert=function(){
  rpSelf=this;
  rpSelf.postData=rpSelf.postData.sort(function(a,b){return a.date < b.date;});
  var max=(rpSelf.postData.length<RELATED_MAX) ? rpSelf.postData.length : RELATED_MAX;
  if(0<max){
    for(var i=0; i<max; i++){
      rpSelf.list.append($('<li>').append($('<a>').text(rpSelf.postData[i].title).attr('title',rpSelf.postData[i].title).attr('href',rpSelf.postData[i].link).attr('date',rpSelf.postData[i].date)));
    };
    rpSelf.related.fadeIn("slow");
  };
  rpSelf.get();
};