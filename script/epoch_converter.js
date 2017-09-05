var epochNow=new Date(),
eo=$('#epoch-option'),
eodate=eo.find('#offset-date'),
eohour=eo.find('#offset-hour'),
eominutes=eo.find('#offset-minutes'),
eoseconds=eo.find('#offset-seconds'),
eomilliseconds=eo.find('#offset-milliseconds'),
eoepoch=eo.find('#offset-epoch'),
ec=$('#epoch-convert'),
eyear=ec.find('#year'),
emonth=ec.find('#month'),
edate=ec.find('#date'),
ehour=ec.find('#hour'),
eminutes=ec.find('#minutes'),
eseconds=ec.find('#seconds'),
emilliseconds=ec.find('#milliseconds'),
epoch=ec.find('#epoch');

// 初期値セット
eo.find('input:radio:checked').trigger('click');
// checkboxは1回のclickだとチェックが外れるので2回実行する
eo.find('input:checkbox:checked').trigger('click').trigger('click');
nowEpoch();

function getKind(){
  return eo.find('input[name=kind]:checked').val();
};
function getOffsetOperator(){
  return eo.find('input[name=offset-operator]:checked').val();
}
function getOffsetMilliseconds(){
  var o=new Date();
  o.setTime(0);
  if(0<eo.find('input[name=offset]:checked').length){
    var k=getKind();
    if(eo.find('input[name=offset-type]:checked').val()=="date"){
      if(eodate.val()!=""){
        o.setTime(eodate.val().to_int()*24*60*60*1000);
      };
      if(eohour.val()!=""){
        o.setTime(o.getTime()+eohour.val().to_int()*60*60*1000);
      };
      if(eominutes.val()!=""){
        o.setTime(o.getTime()+eominutes.val().to_int()*60*1000);
      };
      if(eoseconds.val()!=""){
        o.setTime(o.getTime()+eoseconds.val().to_int()*1000);
      };
      if(k=="milliseconds"){
        o.setTime(o.getTime()+eomilliseconds.val().to_int());
      };
    }else{
      if(k=="milliseconds"){
        o.setTime(eoepoch.val());
      }else{
        o.setTime(eoepoch.val().to_int()*1000);
      }
    }
  }
  return o.getTime();
};
function dateToEpoch(d){
  var k=getKind(),
  oo=getOffsetOperator(),
  oms=getOffsetMilliseconds();
  if(!d){
    d=new Date(eyear.val(),emonth.val().to_int()-1,edate.val(),ehour.val(),eminutes.val(),eseconds.val(),0);
    if(k=="milliseconds"){
      d.setMilliseconds(emilliseconds.val());
    }
  };
  if(oo=="add"){
    d.setTime(d.getTime()+oms);
  }else{
    d.setTime(d.getTime()-oms);
  };
  if(k=="milliseconds"){
    epoch.val(d.getTime());
  }else{
    epoch.val((d.getTime()/1000).omit());
  }
};
function epochToDate(d){
  var k=getKind(),
  oo=getOffsetOperator(),
  oms=getOffsetMilliseconds();
  if(!d){
    d=new Date();
    if(k=="milliseconds"){
      d.setTime(epoch.val());
    }else{
      d.setTime(epoch.val().to_int()*1000);
    }
  };
  if(oo=="add"){
    d.setTime(d.getTime()+oms);
  }else{
    d.setTime(d.getTime()-oms);
  };
  eyear.val(d.getFullYear());
  emonth.val(d.getMonth()+1);
  edate.val(d.getDate());
  ehour.val(d.getHours());
  eminutes.val(d.getMinutes());
  eseconds.val(d.getSeconds());
  emilliseconds.val(d.getMilliseconds());
};
function nowEpoch(){
  var now=new Date();
  dateToEpoch(new Date(now.getTime()));
  epochToDate(new Date(now.getTime()));
};