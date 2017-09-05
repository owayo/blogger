var AWSREQ='aws-request',
AWSRES='aws-response',
LIMIT=1000*60*60*24;

var now=new Date();
// GAEのアクセス数を減らすため、複数条件でAPIをリクエストするためのライブラリ
var AwsProductAdvertising=function(data, entityTag){
  if (data) {
    var sendData={etag:entityTag},
    me=this;
    me.data = data;
    for(var k in data){
//      console.info(k)
//      console.dir(data[k])
      if(data[k].insert && $.isArray(data[k].insert)){
        var eleCount=0;
        $.each(data[k].insert,
          function(){
            var d=this;
            if(d.selector){
              var obj=$(d.selector)
              if(0<obj.length){
                d.element=obj;
                d.output=$('<dl>');
                eleCount++;
              }
            };
            if(d.range){
              var ran=d.range.split(',');
              d.rangeStart=ran[0].to_int();
              if(ran[1]){
                d.rangeEnd=d.rangeStart + (ran[1].to_int()-1);
              }
            }
          }
        );
        if(0<eleCount && data[k].max && 0<data[k].max && data[k].option){
          me.data[k].option = $.extend({
            Condition:"New",
            MerchantId: "Amazon",
            Operation: "ItemSearch",
            ResponseGroup: "ItemAttributes,OfferSummary,Images",
            SearchIndex: "All",
            Sort: "salesrank"
          }, me.data[k].option);
//          console.dir(me.data[k]);
          for(var kk in me.data[k].option){
            if(!/^[\w,-]+$/.test(me.data[k].option[kk])){
              me.data[k].option[kk]=encodeURIComponent(me.data[k].option[kk]);
            }
          };
//          console.dir(me.data[k]);
          sendData[k]=me.data[k].option;
          sendData[k].max=me.data[k].max;
        }
      }
    };
    me.sendData=sendData;
    var storageDataExist=false;
//StorageRemove([AWSREQ,AWSRES]);
    if( StorageKeyExist([AWSREQ,AWSRES]) ){
      var req=StorageLoad(AWSREQ),
      res=StorageLoad(AWSRES);
//console.dir(req);
//console.dir(res);
      if(req.data == Object2Text(sendData) && now.getTime() < ((req.key).to_int() + LIMIT) ){
//console.info("Storage data found.");
        storageDataExist=true;
        var json=eval(res.data);
        for(var k in json){
//console.info("Storage data parse. "+k);
          if(me.data[k]){
            me.data[k].jsonObject=json[k];
            me.parse(k);
          }
        };
      }else{
        StorageRemove([AWSREQ,AWSRES]);
      }
    };
    if(!storageDataExist){
//console.info("Storage data not found.");
//console.info(Object2Text(sendData));
//console.dir(sendData);
      $.getJSON('http://log-roid.appspot.com/aws', sendData, function(json){
        //console.info("json");
        //console.dir(json);
        for(var k in json){
          me.data[k].jsonObject=json[k];
          me.parse(k);
        };
        StorageSave(AWSREQ,sendData,now.getTime());
        StorageSave(AWSRES,json,now.getTime());
      });
    }
  }
};
AwsProductAdvertising.prototype.getOutput=function(key,n){
  var me=this,
  out=null;
//console.info(key+" - "+n)
  if(me.data[key].insert.length == 1){
    out=me.data[key].insert[0].output
  }else{
    $.each(me.data[key].insert,function(i,v){
      if(v.rangeStart != undefined){
        if(v.rangeStart <= n){
          if(v.rangeEnd != undefined){
            if(n <= v.rangeEnd){
              out=v.output;
              return false; // break
            }
          }else{
            out=v.output;
            return false; // break
          }
        }
      }
    });
  };
  return out;
};
AwsProductAdvertising.prototype.parse=function(key){
  var me=this;
  if(me.data[key].jsonObject && 0<me.data[key].jsonObject.length){
    $.each(me.data[key].jsonObject,function(i,v){
      var itemName=(v.title).normalize(),
      itemUrl=v.detailpageUrl,
      mimageUrl=v.mediumimageUrl,
      limageUrl=v.largeimageUrl,
      limageHeight=(v.largeimageHeight).to_int(),
      limageWidth=(v.largeimageWidth).to_int(),
      price=v.formattedPrice,

// -----
//      mimageUrl="http://127.0.0.1:8888/images/160_160.png",
//      limage=["hoge"],
//      limageUrl="http://127.0.0.1:8888/images/250_250.png",
//      limageHeight="250",
//      limageWidth="250",
// -----

      dl=me.getOutput(key,i),
      dt=$('<dt>').append( $('<a>').text(itemName).attr('href',itemUrl).attr('target','_blank').attr('title', itemName) ).attr('count',i),
      a=$('<a>').attr('href',itemUrl).attr('target','_blank').attr('title', itemName).append( $('<img>').attr('src',mimageUrl) ).append($('<div>').text(price)),
      dd=$('<dd>').append( a );

      // 大きな画像が見つかった場合、マウスオーバーで大きな画像を表示する
      if(limageUrl && limageUrl!=""){
        a.hover(
          function(){
            var obj=$(this),
            imgoh=obj.find("img").outerHeight(true),
            mh=parseInt(limageHeight,10)/2;
            li=$('<div>').addClass('large-image').css('top',(imgoh/2)+'px').css('margin-top','-'+mh+'px').append($('<img>').attr('src',limageUrl).attr('height',limageHeight).attr('width',limageWidth))
            obj.find('>img').css('opacity','0.5');
            obj.append(li.hide().fadeIn("slow"));
          },
          function(){
            var obj=$(this);
            obj.find('>img').css('opacity','1');
            obj.find('.large-image').remove();
          }
        );
      };
      dl.append( dt ).append( dd );
    });
    $.each(me.data[key].insert,function(i,v){
      v.element.empty().append(v.output).hide().fadeIn("slow");
    });
  }
};
