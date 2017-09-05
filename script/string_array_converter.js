function convertStringArray(){
  var c=$('div#string_array_container'),
  sdv=c.find('#string_data').val(),
  sar=c.find('#string_array_result'),
  ed=c.find('#empty_delete'),
  edf=ed.get(0).checked,
  lbj=c.find('#line_break_join'),
  lbjf=lbj.get(0).checked,
  ls=c.find('#line_strip'),
  lsf=ls.get(0).checked,
  line=sdv.split(/\r?\n/),
  r="";
  if(lsf){
    line=$.map(line,function(l){return l.replace(/^[\s@]+|[\s@]+$/g,'')});
  };
  if(edf){
    line=$.grep(line,function(l){return l!=''});
  };
  r="["+ $.map(line,function(l){return "'"+l.replace(/([^'])'/g,"$1\\'")+"'"}).join(",\n") +"]";
  if(lbjf){
    r+=".join(\"\\n\")";
  }
  sar.val(r+";");
};

function clearStringArray(){
  var c=$('div#string_array_container');
  c.find('#string_data').val('');
  c.find('#string_array_result').val('');
};