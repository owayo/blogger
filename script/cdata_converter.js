var cdataRegex=new RegExp();
cdataRegex.compile("<[^<>]*?><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/[^>]*>(\\.toString\\(\\))?","ig")
function convertCdata(){
  var c=$('div#cdata_converter_container'),
  cdv=c.find('#convert_data').val(),
  cr=c.find('#convert_result'),
  tsd=c.find('#tostring_delete'),
  tsdf=tsd.get(0).checked,
  ced=$('#empty_delete'),
  cedf=ced.get(0).checked,
  ls=c.find('#line_strip'),
  lsf=ls.get(0).checked,
  cdvb=cdv.replace(cdataRegex,function(all,cdata,to_string){
    var line=cdata.split(/\n/),
    ret="";
    if(lsf){
      line=$.map(line,function(l){return l.replace(/^[\sÅ@]+|[\sÅ@]+$/g,'')});
    };
    if(cedf){
      line=$.grep(line,function(l){return l!=''});
    };
    line=$.map(line,function(l){return "'"+l.replace(/([^'])'/g,"$1\\'")+"'"});
    if(line.length<=1){
      ret=line.join("");
    }else{
      ret="["+line.join(",\n")+"].join(\"\\n\")";
    };
    if(!tsdf && to_string != ""){
      ret+=to_string;
    };
    return ret;
  });
  cr.val(cdvb);
};

function clearCdata(){
  var c=$('div#cdata_converter_container');
  c.find('#convert_data').val('');
  c.find('#convert_result').val('');
};