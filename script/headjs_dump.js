var css3Detection={
  borderimage:'border-image のサポート',
  borderradius:'border-radius のサポート',
  boxshadow:'box-shadow のサポート',
  cssreflections:'reflect のサポート',
  csstransforms:'transform、transform-origin のサポート',
  csstransitions:'transition のサポート',
  fontface:'@font-face のサポート',
  multiplebgs:'multiple backgrounds のサポート',
  opacity:'opacity のサポート',
  rgba:'RGBA colors のサポート',
  textshadow:'text-shadow のサポート',
  gradient:'gradient のサポート'
},
browserDetection={
  ie:'Internet Explorer か',
  webkit:'Webkit 系ブラウザか',
  opera:'Opera か',
  mozilla:'Mozilla 系ブラウザか',
  version:'ブラウザのバージョン'
};
function HeadjsDumpExec(){
  var k=null,
  dumped=[],
  css3dl=$('#css3-detection-list').empty(),
  browserdl=$('#browser-detection-list').empty();

  htmlClassNameScreenDetectionDump();

  for(k in css3Detection){
    detectionListPush(css3dl, k, css3Detection[k], head[k])
  };
  for(k in head.browser){
    dumped.push(k);
    detectionListPush(browserdl, 'head.browser.'+k, browserDetection[k], head.browser[k] || typeof head.browser[k])
  }
  for(k in browserDetection){
    if($.inArray(k, dumped) == -1){
      detectionListPush(browserdl, 'head.browser.'+k, browserDetection[k], head.browser[k])
    }
  }
  $(window).resize(htmlClassNameScreenDetectionDump);
};
function htmlClassNameScreenDetectionDump(){
  var htmlcn=$('#html-class-name').empty(),
  screendl=$('#screen-detection-list').empty(),
  propList=$('html').attr('class').replace(/^\s+|\s+$/g,'').split(/\s+/).sort(),
  ssd=[];

  $.each(propList,
    function(){
      htmlcn.append($('<li>').text(this));
      if(/-\d+$/.test(this)){
        ssd.push(this);
      }
    }
  );
  $.each(ssd.sort(
    function(a, b){
      return (parseInt(a.split('-').pop(),10) > parseInt(b.split('-').pop(),10)) ? 1 : -1;;
    }
  ),
    function(){
      var p=this;
      if(/^(lt|w)-\d/i.test(this)){
        screendl.append($('<li>').text(this));
      }
    }
  );
};
function detectionListPush(dl, property, description, val){
  var s=null,dt=null,dd=null;
  try{
    s=(typeof val == 'undefined') ? typeof val : val.toString();
    dt=$('<dt>').text(property).append($('<span>').text('('+description+')'))
    dd=$('<dd>').addClass(s.replace(/\s+/g,'-')).text(s+' ( '+(typeof val)+' )');
  }catch(e){
    dt=$('<dt>').text(property)
    dd=$('<dd>').text(e);
  }
  dl.append(dt).append(dd);
};