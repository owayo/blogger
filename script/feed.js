var FEEDREQ='feed-request',
FEEDRES='feed-response',
LIMIT=60*60*1000;

var now=new Date(),
yesterday=new Date();
yesterday.setTime(new Date().getTime() - 86400000);

var Feed=function(data, entityTag){
  if (data) {
    var sendData={urls:[],etag:entityTag},
    me=this;
    me.data=data;
    for(var k in me.data){
//console.info(k);
      if(data[k].insert){
        var ins=$(me.data[k].insert);
        if(0<ins.length){
          me.data[k].insertElement=ins;
          sendData.urls.push(k);
        };
      }
    };
//console.dir(sendData);
    if(0<sendData.urls.length){
      var storageDataExist=false;
      if( StorageKeyExist([FEEDREQ,FEEDRES]) ){
        var req=StorageLoad(FEEDREQ),
        res=StorageLoad(FEEDRES);
        //console.log(now.getTime()+" "+((req.key).to_int() + LIMIT));
        // 1時間はlocalStorage内のデータを使う
        if(req.data == Object2Text(sendData) && now.getTime() < ((req.key).to_int() + LIMIT) ){
console.info("Storage data found.");
          storageDataExist=true;
          var json=eval(res.data);
//console.dir(json)
          for(var k in json){
          console.info("Storage data parse. "+k);
            me.data[k].jsonObject=json[k];
            me.parse(k);
          };
          me.sortElement(json);
        }else{
          StorageRemove([FEEDREQ,FEEDRES]);
        }
      };
      if(!storageDataExist){
console.info("Storage data not found.");
        $.getJSON('http://log-roid.appspot.com/feed', sendData, function(json){
          //console.info("json");
          //console.dir(json);
          for(var k in json){
console.info("Storage data parse. "+k);
            me.data[k].jsonObject=json[k];
            me.parse(k);
          };
          me.sortElement(json);
          StorageSave(FEEDREQ,sendData,now.getTime());
          StorageSave(FEEDRES,json,now.getTime());
        });
      }
    }
  }
};
Feed.prototype.parse=function(key){
  var me=this;
  if(me.data[key].jsonObject && 0<me.data[key].jsonObject.length){
    var container=$('<dl>'),
    dt=null;
    $.each(me.data[key].jsonObject, function(i,v){
      var pubDate=new Date(),
      t='_blank';
      pubDate.setTime(parseInt(v.published_date,10));
      if((v.url).is_logroid()){t='_self';};
      dt=$('<dt>').append($('<a>').attr('target',t).attr('title',v.title).attr('href',v.url).text( v.formated_published_date ));
      if(yesterday<pubDate){
        dt.addClass('new');
      };
      container
        .append(dt)
        .append(
          $('<dd>').append($('<a>').attr('target',t).attr('title',v.title).attr('href',v.url).text(v.title))
      );
    });
    me.data[key].insertElement.empty().append(container.hide());
  }
};
Feed.prototype.sortElement=function(json){
  var me=this,
      sort_key = [],
      elements = [];
  for(var k in json) {
    sort_key.push({key: k, num: json[k].length > 0 ? json[k][0].published_date : 0 })
  }
  sort_key = sort_key.sort(function(a,b){ return a.num < b.num ? 1 : -1; })
  // console.dir(sort_key);
  $.each(sort_key, function(i,v){
    var $container = me.data[v.key].insertElement,
        $label = $container.prev();
    // console.dir(me.data[v.key].insertElement)
    // console.dir($container)
    // console.dir($label)
    elements.push($label);
    elements.push($container);
  });
  var $parent = elements[0].parent(),
      $div = $('<div>');
  $.each(elements, function(_,v){
    $div.append(v);
  });
  // console.dir($parent)
  $parent.html($div.html()).find('dl').fadeIn('slow');
}