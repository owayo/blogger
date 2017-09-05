var self=null,listObject={};
var ScriptBenchmark=function(){
  self=this;
  self.list=$('#pattern-list');
  self.count=0;
};
ScriptBenchmark.prototype.patternAdd=function(){
  self=this;
  var ta=$('<textarea>').attr('wrap','off').attr('spellcheck','false').attr('placeholder','ベンチマークを採取する JavaScript を入力'),
  li=$('<li>').append(
    $('<div>').addClass('radius-border').append(
      $('<button>').text('削除').addClass('float-right').addClass('red').attr('key',self.count).click(self.patternDelete)
    ).append(
      ta
    )
  );
  self.list.append( li );
  listObject[self.count]={list:li,textarea:ta};
  self.count++;
  return ta;
};
ScriptBenchmark.prototype.patternDelete=function(e){
  self=this;
  var key=$(e.target).attr('key');
  listObject[key].list.remove();
  listObject[key]=null;
};
ScriptBenchmark.prototype.clear=function(){
  self=this;
  self.list.empty();
  listObject={};
};
ScriptBenchmark.prototype.start=function(){
  self=this;
  var count=$('#run-count').val().to_int(),
  set=$('#set-count').val().to_int(),
  jquery=$('input[name="jquery-load"]:checked').val().to_boolean(),
  version=$('#jquery-version').val(),
  codeCount=0,
  contents=$('<div>'),
  script='<script type="text/javascript">\n',
  functions=[];
  contents.append( $('<h3>').text('JavaScript ベンチマーク') ).append( $('<span>').text(count+' 回 x '+set+' セット実行') );
  contents.append($('<div>').css('text-align','center').append($('<button>').attr('onclick','benchmark();').text('再実行')));
  for(var i=0,maxi=self.count; i<maxi; i++){
    if(!listObject[i]){
      continue;
    };
    var code,tag,bmid='benchmark_'+i;
    code=listObject[i].textarea.val().strip();
    if(code != ""){
      codeCount++;
      script+="function bmf_"+i+"(){\n";
      script+=code;
      script+="\n}\n";
      functions.push({functionName:"bmf_"+i,number:i});
      contents.append(
        $('<hr>')
      ).append(
        $('<pre>').attr('id',bmid).text(code)
      ).append(
        $('<table>').append(
          $('<thead>').append(
            $('<tr>').append(
              $('<th>').text('No')
            ).append(
              $('<th>').text('累計(秒)')
            ).append(
              $('<th>').text('平均(秒)')
            )
          )
        ).append(
          $('<tbody>').attr('id',bmid+"_result")
        )
      );
    }
  }
  if(0<codeCount){
    script+="var F=["+$.map(functions,function(m){return m.functionName}).join(',')+"],\n";
    script+="N=["+$.map(functions,function(m){return m.number}).join(',')+"];\n";
    script+="function benchmark(){\n"
    script+="for(var i=0,maxi=F.length; i<maxi; i++){\n";

    script+="var r=document.getElementById('benchmark_'+N[i]+'_result');\n"
    script+="var total=0;\n";

    script+="for(var ii=1,maxii="+set+"; ii<=maxii; ii++){\n";
    script+="try{\n";
    script+="var bms_"+i+"=new Date();\n";
    script+="for(var iii=0,maxiii="+count+"; iii<maxiii; iii++){\n";

    script+="F[i]();\n";

    script+="}\n"; // for iii
    script+="var bme_"+i+"=new Date();\n";
    script+="var tr=document.createElement('tr'),countTd=document.createElement('td'),totalTd=document.createElement('td'),avgTd=document.createElement('td'),n=bme_"+i+" - bms_"+i+";\n";
    script+="total+=n;\n";
    script+="countTd.innerHTML=ii;\n";
    script+="totalTd.innerHTML=n;\n";
    script+="avgTd.innerHTML=n/"+count+";\n";
    script+="tr.appendChild(countTd);\n";
    script+="tr.appendChild(totalTd);\n";
    script+="tr.appendChild(avgTd);\n";
    script+="r.appendChild(tr);\n";
    script+="}catch(e){\n";
    script+="var tr=document.createElement('tr'),countTd=document.createElement('td'),td=document.createElement('td');\n";
    script+="countTd.innerHTML=ii;\n";
    script+="td.innerHTML=e.toString();\n"
    script+="td.setAttribute('colspan','2');\n"
    script+="tr.appendChild(countTd);\n";
    script+="tr.appendChild(td);\n";
    script+="r.appendChild(tr);\n";
    script+="}\n"; // try catch
    script+="}\n"; // for ii

    script+="var ttr=document.createElement('tr'),ttd1=document.createElement('td'),ttd2=document.createElement('td'),ttd3=document.createElement('td');\n";
    script+="ttd2.innerHTML=total;\n";
    script+="ttd3.innerHTML=total/("+count+"*ii);\n";
    script+="ttr.appendChild(ttd1);\n";
    script+="ttr.appendChild(ttd2);\n";
    script+="ttr.appendChild(ttd3);\n";
    script+="r.appendChild(ttr);\n";

    script+="}\n"; // for i
    script+="}\n" //function
    script+='benchmark();\n</script>';
    if(jquery){
      script='<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/'+version+'/jquery.min.js"></script>\n'+script;
    };
    var style="<style type='text/css'>";
    style+="pre{border:1px solid #CCC; padding:0.5em; overflow-x:auto;margin-left:1em;}";
    style+="table{margin-left:2em;}";
    style+="table,table *{border:1px solid #CCCCCC; border-collapse: collapse;}";
    style+="th,td{padding:3px 5px;}";
    style+="th{text-align:center;}";
    style+="td{text-align:right;}";
    style+="button{padding:10px;}";
    style+="</style>";
    bmw=window.open('about:blank','benchmark_'+new Date().getTime());
    bmw.document.write('<html><head>'+style+'</head><body>');
    bmw.document.write(contents.html());
    bmw.document.write(script);
    bmw.document.write('</body></html>');
    bmw.document.close();
  }
};