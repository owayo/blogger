/*
  target    zenbackを表示する対象のjQueryオブジェクト、もしくはエレメントのid
              ex.
                zenback-widget

  url       zenbackのurl(&rand=は不要)
              ex.
                http://widget.zenback.jp/?base_uri=http%3A//logroid.blogspot.jp/&nsid=105425518962166127%3A%3A105425529431131151

  option

    loaded          ページが既に読み込まれているか (boolean)
                    既にwindowのloadイベントが呼ばれた後、このライブラリを実行している場合はtrue
                    default:false

    offset          iframeの高さのoffset
                    jQuery iframe auto height pluginに渡される
                    default:0

    selector        ロードされたとみなすセレクタ
                    default:'.zenback-module-item-text>a:not(:empty)'

    maxCheck        selectorが存在するかの最大チェック回数 (1s間隔)
                    default:60

    iframeClass     iframeに適用するclass名
                    default:null

    cssProperties   iframeに適用するcssのHash
                    default:null

  require
    jQuery iframe auto height plugin : https://github.com/house9/jquery-iframe-auto-height
*/
var self=null;
var zenbackLazyLoading=function(target,url,opt){
  self=this;
  self.options= $.extend({
    loaded: false,
    offset: 0,
    maxCheck: 60,
    iframeClass: null,
    cssProperties: null,
    selector: '.zenback-module-item-text>a:not(:empty)'
  }, opt);
  if(!(target instanceof jQuery)){
    target=$('#'+target.toString());
  };
//console.dir(self.options)
  self.target=target;
  if(0<self.target.length && $.isFunction(jQuery.fn.iframeAutoHeight)){
    self.url=url+'&rand='+Math.ceil((new Date()*1)*Math.random());
    self.counter=0; // loadCheck するカウンタ
    if(self.options.loaded){
      self.load();
    }else{
      // ページのload完了後にzenbackを読み込む
      $(window).load(function() {
        self.load();
      });
    };
  }
};
zenbackLazyLoading.prototype.load=function(){
  self=this;
//console.log("loaded");
  var oh=0,nh=0,count=0;
  var iframe=jQuery('<iframe>').css('width','100%').css('border','none').attr('scrolling','no').attr('marginwidth','0').attr('marginheight','0').iframeAutoHeight({heightOffset:self.options.offset,callback:function(obj){
//console.log('new height:'+obj.newFrameHeight);
      // 本当にロードされたか確認する
      self.loadCheck();
    }
  });
  if(self.options.iframeClass){
    iframe.addClass(self.options.iframeClass)
  };
  if(self.options.cssProperties && !$.isEmptyObject(self.options.cssProperties) && !$.isArray(self.options.cssProperties)){
    iframe.css(self.options.cssProperties)
  };
  self.target.append(iframe);
  self.iframe=iframe;
  var iframeDocument=iframe.contents();
  iframeDocument[0].open();
  iframeDocument[0].write('<html><head><script src="'+self.url+'"  type="text/javascript"></script><script type="text/javascript"></script></head><body></body></html>');
  iframeDocument[0].close();
};
zenbackLazyLoading.prototype.loadCheck=function(){
  self=this;
  function check(){
    return (0<self.iframe.contents().find(self.options.selector).length) ? true:false;
  };
  function loaded(){
    var h=(self.iframe.contents().find('body')[0].scrollHeight+self.options.offset)+'px';
    self.iframe.css('height',h).css('min-height',h);
  };
  if(check()){
//console.log('load complete.')
    loaded();
  }else{
    if(self.counter < self.options.maxCheck){
      self.counter++;
      window.setTimeout(function(){self.loadCheck()},1000);
    }else{
      // 諦める前に高さ調整
      loaded();
      if(window.console && console.log){
        console.log(self.options.selector)
      }
    }
  }
};