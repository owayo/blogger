var RSSREQ='rss-request',
RSSRES='rss-response';
var RssJson=function(data){
  if (data) {
    var sendData={urls:[]},
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
      if( StorageKeyExist([RSSREQ,RSSRES]) ){
        var req=StorageLoad(RSSREQ),
        res=StorageLoad(RSSRES);
        // 1時間はlocalStorage内のデータを使う
        if(req.data == Object2Text(sendData) && new Date().getTime() < ((req.key).to_int() + 3600000) ){
//console.info("Storage data found.");
          storageDataExist=true;
          var json=eval(res.data);
//console.dir(json)
          for(var k in json){
//console.info("Storage data parse. "+k);
            me.data[k].jsonObject=json[k];
            me.parse(k);
          };
        }else{
          StorageRemove([RSSREQ,RSSRES]);
        }
      };
      if(!storageDataExist){
//console.info("Storage data not found.");
        $.getJSON('http://log-roid.appspot.com/rssjson', sendData, function(json){
          //console.info("json");
          //console.dir(json);
          for(var k in json){
//console.info("Storage data parse. "+k);
            me.data[k].jsonObject=json[k];
            me.parse(k);
          };
          var now=new Date();
          StorageSave(RSSREQ,sendData,now.getTime());
          StorageSave(RSSRES,json,now.getTime());
        });
/*
        $.ajax({
          //url:'http://localhost:8080/rssjson',
          url:'http://log-roid.appspot.com/rssjson',
          data : sendData,
          dataType : 'jsonp',
          success : function(json){
//console.dir(json)
            for(var k in json){
//console.info("Storage data parse. "+k);
              me.data[k].jsonObject=json[k];
              me.parse(k);
            };
            var now=new Date();
            StorageSave(RSSREQ,sendData,now.getTime());
            StorageSave(RSSRES,json,now.getTime());
          }
        });
*/
      }
    }
  }
};
RssJson.prototype.parse=function(key){
  var me=this;
  if(me.data[key].jsonObject && 0<me.data[key].jsonObject.length){
    var now=new Date(),
    yesterday=now.setTime(new Date().getTime() - 86400000),
    container=$('<dl>'),
    dt=null;
    $.each(me.data[key].jsonObject,function(i,v){
//console.dir(v)
      var pubDate=new Date(),
      t='_blank';
      pubDate.setTime(parseInt(v.published_date,10));
      var padDate=pubDate.getPaddingDate();
      if((v.url).is_logroid()){t='_self';};
      dt=$('<dt>').append($('<a>').attr('target',t).attr('title',v.title).attr('href',v.url).text( padDate.year+"/"+padDate.month+"/"+padDate.day+" "+padDate.hour+":"+padDate.minute ));
      if(yesterday<pubDate){
        dt.addClass('new');
      };
      container
        .append(dt)
        .append(
          $('<dd>').append($('<a>').attr('target',t).attr('title',v.title).attr('href',v.url).text(v.title))
      );
    });
    me.data[key].insertElement.empty().append(container.hide().fadeIn('slow'));
  }
};