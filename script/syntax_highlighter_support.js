// http://alexgorbatchev.com/SyntaxHighlighter/hosting.html
// http://alexgorbatchev.com/SyntaxHighlighter/manual/brushes/
// http://alexgorbatchev.com/SyntaxHighlighter/download/
/*
$.find.error = function(msg){
    console.error(msg); throw '[ERROR][jQuery]';
};
*/
var template="<pre class='@CLASS@'>@CODE@</pre>",
shOptions=['auto-links','class-name','collapse','gutter','html-script','smart-tabs','tab-size','toolbar'],
baseURL='https://sites.google.com/site/logroid/syntaxhighlighter',
iframeContents="<html><head><link href='@URL@/shCore.css' rel='stylesheet' type='text/css'/><link href='@URL@/shThemeDefault.css' rel='stylesheet' type='text/css' /><script src='@URL@/shCore.js' type='text/javascript'></script><script src='@URL@/shAutoloader.js' type='text/javascript'></script><style type='text/css'>.syntaxhighlighter{overflow-y:hidden !important;margin:0 !important;}.syntaxhighlighter>table{margin:5px 0 !important;}</style><script type='text/javascript'>function SyntaxHighlighterExec(){try{SyntaxHighlighter.autoloader.apply(null,@BRUSH@);SyntaxHighlighter.all();}catch(e){}};if(document.addEventListener){document.addEventListener('DOMContentLoaded', SyntaxHighlighterExec, false );}else if(document.attachEvent){document.attachEvent( 'onreadystatechange', SyntaxHighlighterExec );}else{document.body.onload=SyntaxHighlighterExec();}</script></head><body style='margin:0;padding:0 0 40px;font-size:12px !important;line-height: 1.1em !important;overflow-y:hidden;'>@BODY@</body></html>";

var shs=$('#syntax-highlighter-support'),
shsc=shs.find('#code'),
shshls=shs.find('#highlight-line-select'),
shssh=shs.find('#syntax-highlighter'),
shsop=shs.find('#syntax-highlighter-options'),
shssu=shs.find('#set-url'),
shsopTitle=shsop.find('#title'),
shsopBrush=shsop.find('#brush'),
shsopFirstLine=shsop.find('#first-line'),
shsopHighlight=shsop.find('#highlight'),
shsp=shs.find('iframe#preview'),
shspDocument=shsp[0].contentWindow.document;

//shsopAutoLinks=shsop.find('#auto-links'),
//shsopClassName=shsop.find('#class-name'),
//shsopCollapse=shsop.find('#collapse'),
//shsopGutter=shsop.find('#gutter'),
//shsopHtmlScript=shsop.find('#html-script'),
//shsopSmartTabs=shsop.find('#smart-tabs'),
//shsopTabSize=shsop.find('#tab-size'),
//shsopToolbar=shsop.find('#toolbar');

function SyntaxHighlighterSupportExec(){
  shsop.find('select,input').change(codeUpdate);
  shsc.change(function(){
    setTextAreaHeight( shsc, shsc.val().split('\n').length );
    codeUpdate();
  });
  shssh.change(function(){
    setTextAreaHeight( shssh, shssh.val().split('\n').length );
  });

  // live
  //shshls.find('li').live("click",highlightSwitch);
  shsop.find('input[toggle]').click(function(){
    optionClick($(this));
  });

  shsopFirstLine.change(function(){
    //shsop.find('#highlight').val('').trigger('change');
    var h=shsopHighlight.val().split(',');
    h=highlightCheck(h);
    shsopHighlight.val(h.join(','));
  });

  shsopHighlight.change(codeUpdate);

  shsp.load(
    function(){
      var obj=$(this);
      if(typeof obj.attr('height') == 'undefined'){
        var d=this.contentWindow.document,
        h = 0;
        if(d.body && d.body.scrollHeight){
          h=Math.max(
                          d.body.scrollHeight,
                          d.body.offsetHeight,
                          d.body.clientHeight
                  );
        }else if(d.documentElement && d.documentElement.scrollHeight){
          h=Math.max(
                          d.documentElement.scrollHeight,
                          d.documentElement.offsetHeight,
                          d.documentElement.clientHeight
                  );
        }
        obj.height(h);
      }
    }
  );
  shsp.triggerHandler('load');
  argvParser();
  shsc.trigger('change');
//  codeUpdate();
};
function setTextAreaHeight(obj,n){
  var lh=obj.css('line-height'),h;
  if(lh.match(/^(\d+)([^\d]+)$/)){
    h=RegExp.$1.to_int()*(n+2);
    obj.css('height', h+RegExp.$2);
  }
};
function optionClick(o){
  if(o.attr('checked')){
    shsop.find('input[name="'+o.attr('toggle')+'"]').removeAttr('disabled');
  }else{
    shsop.find('input[name="'+o.attr('toggle')+'"]').attr('disabled',true);
  }
};
function argvParser(){
  if(window.location.search !=""){
    var argv=$.map(window.location.search.substring(1).split('&'),function(v){
      if(v){
        var h=v.split('=');
        return {key:h[0], value:h[1]};
      }
    });
    if(0<argv.length){
      for(var i=0,maxi=argv.length; i<maxi; i++){
        var k=argv[i]['key'],
        v=argv[i]['value'],
        o=null;
        if(k != ""){
          o=shsop.find('#'+k);
          if(0<o.length){
            o.val(v);
          }else{
            o=shsop.find('[toggle="'+k+'"]');
            if(0<o.length){
              o.attr('checked',true);
              optionClick(o);
              $('[name="'+k+'"]').each(
                function(){
                  var oo=$(this);
                  switch(oo.attr('type').toUpperCase()){
                    case 'TEXT':
                      oo.val(v);
                      break;
                    case 'RADIO':
                      if(oo.val()==v){
                        oo.attr('checked',true);
                      };
                      break;
                    default:
                  }
                }
              )
            }
          }
        }
      }
    }
  }
};
function codeInit(){
  shshls.empty();
  shspDocument.open();
  shspDocument.write('');
  shspDocument.close();
  shssh.val('');
  shsp.css('height','0');
};
function formClear(){
  codeInit();
  shsc.val('').trigger('change');
  shssh.val('').trigger('change');
  shsop.find('input[type="text"]').each(function(){$(this).val('');});
  shsop.find('input:checked').each(function(){$(this).removeAttr('checked').trigger('change');});
  shsopFirstLine.val('1');
  shssu.val('');
};
function codeUpdate(){
  codeInit();
  var c=shsc.val(),
  code=c.split("\n"),
  fl=shsopFirstLine.val().to_int(),
  h=shsopHighlight.val().split(','),
  ln=0,
  li=null;

  h=highlightCheck(h);
  shsopHighlight.val(h.join(','));

  makeUrl();

  if(c!="" && 0<code.length){
    // ŠJŽns‚ðÝ’è
    if(isNaN(fl)){fl=0};
    shshls.attr('start',fl).css('padding-left',((fl+code.length).toString().length+1)+'em');
    for(var i=0,maxi=code.length; i<maxi; i++){
      ln=fl+i;
      li=$('<li>').append($('<div>').text(code[i])).attr('line-no',ln).click(highlightSwitch);
      if($.inArray(ln,h) != -1){
        li.addClass('highlight');
      };
      shshls.append(li);
    };
    makeTag();
  }
}
function decimalSort(arr){
  arr=$.map(arr,function(n){if(n){n=n.to_int();if(isNaN(n)){}else{return n}}})
  return arr.sort(function(a,b){
    return a > b;
  });
};
function highlightCheck(h){
  var cl=shsc.val().split('\n').length,
  fl=shsopFirstLine.val().to_int(),
  ll=fl+cl;
  return $.map(decimalSort(h),function(n){
    if(n){
      if(fl<=n && n<=ll){
        return n;
      }else{}
    }
  });
}
function highlightSwitch(){
  var line=$(this),
  h=shsopHighlight.val().split(','),
  ln=line.attr('line-no');
  if(line.hasClass('highlight')){
    line.removeClass('highlight');
    var i=$.inArray(ln,h);
    if(i != -1){
      h.splice(i,1);
    }
  }else{
    line.addClass('highlight');
    h.push(ln);
  }
  h=highlightCheck(h);
  shsopHighlight.val(h.join(','));
  codeUpdate();
};
function makeUrl(){
  var u=[],
  base=window.location.href.replace(window.location.pathname,'/2012/06/syntaxhighlighter-convert-tool.html').replace(window.location.search,'');
  shsop.find('select,input:not([toggle]):not([disabled]):checked,input[type="text"]:not(#highlight)').each(
    function(){
      var o=$(this);
      if(o.val()!=""){
        if(o.attr('name')){
          u.push(o.attr('name')+'='+o.val());
        }else{
          u.push(o.attr('id')+'='+o.val());
        }
        if(o.attr('bugfix')){
          u.push('bugfix=true');
        }
      }
    }
  );
  shssu.val(base+'?'+u.join('&'));
};
function windowOpen(){
  if(shssu.val()!=''){
    window.open(shssu.val());
  }
};
function makeTag(){
  var c=[],
  fl=shsopFirstLine.val().to_int(),
  h=shsopHighlight.val().split(','),
  op=null,
  t='',
  code='';

  if(shsopTitle.val() != ''){
    c.push('title: "'+shsopTitle.val()+'"');
  };
  c.push('brush: '+shsopBrush.find('option:selected').val().replace(/_fix$/i,''));
  c.push('first-line: '+fl);
  if(0<h.length){
    c.push('highlight: ['+h.join(',')+']');
  };

  for(var i=0,maxi=shOptions.length; i<maxi; i++){
    op=shsop.find('input[type="checkbox"][toggle="'+shOptions[i]+'"]:checked');
    if(0<op.length){
      var v=shsop.find('input[name="'+shOptions[i]+'"]');
      if(0<v.length){
        v.each(
          function(){
            var obj=$(this);
            switch(obj.attr('type').toUpperCase()){
              case 'TEXT':
                c.push(shOptions[i]+': '+obj.val());
                break;
              case 'RADIO':
                if(obj.attr('checked')){
                  c.push(shOptions[i]+': '+obj.val());
                }
                break;
              default:
            }
          }
        )
      }
    }
  }
  code=preEscape(shsc.val());
  t=template.replace('@CLASS@',c.join(';')).replace('@CODE@',code);
  shssh.val(t).trigger('change');

};
function preEscape(v){
  if($.support.htmlSerialize){
    v=$('<div>').text(v).html();
  }else{
    v=$('<textarea>').val(v).html();
  }
  return v;
}
function preview(){
  shspDocument.open();
  shspDocument.write('');
  shspDocument.close();
  var brush={'as3':'shBrushAS3.js','shell':'shBrushBash.js','cf':'shBrushColdFusion.js','csharp':'shBrushCSharp.js','cpp':'shBrushCpp.js','css':'shBrushCss.js','delphi':'shBrushDelphi.js','diff':'shBrushDiff.js','erl':'shBrushErlang.js','groovy':'shBrushGroovy.js','js':'shBrushJScript.js','java':'shBrushJava.js','jfx':'shBrushJavaFX.js','pl':'shBrushPerl.js','php':'shBrushPhp.js','text':'shBrushPlain.js','ps':'shBrushPowerShell.js','py':'shBrushPython.js','ruby':'shBrushRuby.js','scala':'shBrushScala.js','sql':'shBrushSql.js','vb':'shBrushVb.js','xml':'shBrushXml.js'},
  u=[],
  sb=shsopBrush.find('option:selected').val(),
  contents=null;

  brush['jq']='shBrushJQuery.js';
  brush['gm']='shBrushGreasemonkey.js';
  brush['bat']='shBrushBat.js';

  for(var b in brush){
    if(/_fix$/i.test(sb) ){
      var bf=brush[b].replace(/\.js$/i,'Fix.js');
      u.push('"'+b+' '+baseURL+'/'+bf+'"');
    }else{
      u.push('"'+b+' '+baseURL+'/'+brush[b]+'"');
    }
  };
  contents=iframeContents.replace('@BODY@',shssh.val()).replace(/@URL@/g,baseURL).replace(/@BRUSH@/,'['+u.join(',')+']');
  shspDocument.open();
  shspDocument.write(contents);
  shspDocument.close();
};
