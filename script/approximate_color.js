//var HEX_COLOR_MAX=16777215,
//HEX_COLOR_MIN=0,
//DEFAULT_STEP=Math.round(HEX_COLOR_MAX/COLOR_MAX_NUM,10),

var RGB_MAX=255,
RGB_MIN=0,
COLOR_STEP_NUM=15,
COLOR_MAX_NUM=31,
DEFAULT_STEP=Math.round(RGB_MAX/COLOR_MAX_NUM);

function getColors(color){
  var colors=[RGB_MAX,RGB_MIN];
  
  switch(color){
    case RGB_MIN:
    case RGB_MAX:
      for(var i=0; i<COLOR_MAX_NUM; i++){
        colors.push( Math.round(RGB_MAX-(DEFAULT_STEP*(i+1))) );
      };
      break;
    default:
      var ustep=0,
      dstep=0,
      upMax=COLOR_STEP_NUM,
      downMax=COLOR_STEP_NUM;

      colors.push(color);

      if(COLOR_STEP_NUM<RGB_MAX-color && COLOR_STEP_NUM<color){
//console.info("ok")
        ustep=Math.round((RGB_MAX-color)/COLOR_STEP_NUM);
        dstep=Math.round(color/COLOR_STEP_NUM);

//console.info("up count:"+upMax)
//console.info("up step:"+ustep)
//console.info("down count:"+downMax)
//console.info("down step:"+dstep)

        for(var i=1; i<upMax; i++){
//console.info("up:"+i+" "+(color+(ustep*i)))
          colors.push(color+(ustep*i));
        };
        for(var i=1; i<downMax; i++){
//console.info("down:"+i+" "+(color-(dstep*i)))
          colors.push(color-(dstep*i));
        };
//console.dir( colors.sort(function(a,b){return b-a}) );
      }else if(COLOR_STEP_NUM<=RGB_MAX-color){
//console.info("ok. near min")
        downMax=color;
        upMax=COLOR_STEP_NUM+(COLOR_STEP_NUM-downMax);

        ustep=Math.round((RGB_MAX-color)/upMax);
        dstep=Math.round(color/downMax);

//console.info("up count:"+uc)
//console.info("up step:"+ustep)
//console.info("down count:"+dc)
//console.info("down step:"+dstep)

        for(var i=1; i<upMax; i++){
//console.info("up:"+i+" "+(color+(ustep*i)))
          colors.push(color+(ustep*i));
        };
        for(var i=1; i<downMax; i++){
//console.info("down:"+i+" "+(color-(dstep*i)))
          colors.push(color-(dstep*i));
        };
//console.dir( colors.sort(function(a,b){return b-a}) );
      }else if(COLOR_STEP_NUM<=color){
//console.info("ok. near max")
        upMax=RGB_MAX-color;
        downMax=COLOR_STEP_NUM+(COLOR_STEP_NUM-upMax);

        ustep=Math.round((RGB_MAX-color)/upMax);
        dstep=Math.round(color/downMax);

//console.info("up count:"+uc)
//console.info("up step:"+ustep)
//console.info("down count:"+dc)
//console.info("down step:"+dstep)

        for(var i=1; i<upMax; i++){
//console.info("up:"+i+" "+(color+(ustep*i)))
          colors.push(color+(ustep*i));
        };
        for(var i=1; i<downMax; i++){
//console.info("down:"+i+" "+(color-(dstep*i)))
          colors.push(color-(dstep*i));
        };
//console.dir( colors.sort(function(a,b){return b-a}) );
      }
  }

  return colors.sort(function(a,b){return b-a});
}

function getApproximateColor(color){
  var colorUpper=color.toUpperCase(),
  r=colorUpper.substr(0,2),
  ra=getColors(parseInt(r,16)),
  g=colorUpper.substr(2,2),
  ga=getColors(parseInt(g,16)),
  b=colorUpper.substr(4,2),
  ba=getColors(parseInt(b,16)),
  colors=[],
  c="";

//console.info(r+" "+g+" "+b);

  for(var i=0; i<COLOR_MAX_NUM; i++){
    c=(ra[i].toString(16).zeroPadding(2)+ga[i].toString(16).zeroPadding(2)+ba[i].toString(16).zeroPadding(2)).toUpperCase();
    colors.push({target:colorUpper==c ? true : false, colorInt:parseInt(c,16), colorHex:c})
  }
//console.dir(colors)
  return colors;
};

function renderColor(data, target){
console.dir(data);

  target.empty();
  var ul=$('<ul>').addClass('approximate-color-list');

  $.each(data, function(){
    var obj=this,hc="#"+obj.colorHex.to_hexcolor().toUpperCase()
    ul.append(
      $('<li>').attr('point',obj.target).append($('<div>').addClass('color-box').css('background-color',hc)).append($('<input>').attr('type','text').attr('readonly','true').attr('size','7').val(hc).click(function(){this.select();}))
    );
  });

  target.append(ul);
};