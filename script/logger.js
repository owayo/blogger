/*
 * $Id: logger.js 63 2012-10-02 19:17:43Z logroid $
 * Logger JS v1.0
 * http://logroid.blogspot.jp/
 *
 * Copyright (c) 2012 Yohei Owa
 * GPL licenses.
 */
var LoggerLevel={
  ALL:-99,
  DEBUG:-1,
  INFO:0,
  WARN:1,
  ERROR:2,
  OFF:99
};
var Logger=function(level){
  var me=this;
  me.level=isNaN(level) ? LoggerLevel.INFO : level;
  me.make();
};
Logger.prototype.make=function(){
  var me=this;
  for(var key in console){
    var l=LoggerLevel[key.toUpperCase()];
    if(!l){l=LoggerLevel.OFF};
    if(me.level<=l){
      if(Function.bind){
        Logger.prototype[key]=(
          function(k){
            return console[k].bind(console);
          }
        )(key);
      }else{
        Logger.prototype[key]=(
          function(k){
            return console[k].apply(console, arguments);
          }
        )(key);
      }
    }else{
      Logger.prototype[key]=function(){};
    }
  }
};
