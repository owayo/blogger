/*
  http://ja.wikipedia.org/wiki/%E5%8D%98%E7%B2%BE%E5%BA%A6
*/
var IEEE754_MAX_LENGTH = 32,
IEEE754_HEX_4BIT_MAX_LENGTH = 8,
IEEE754_EXPONENT_MAX_LENGTH = 8,
IEEE754_FRACTION_LENGTH = 23,
IEEE754_EXPONENT_MAX = Math.pow(2, IEEE754_EXPONENT_MAX_LENGTH),
IEEE754_E_MAX = 127,
IEEE754_NAN_FRACTION = Math.pow(2, IEEE754_FRACTION_LENGTH-1),
IEEE754_32BIT_MIN = Math.pow(2, IEEE754_MAX_LENGTH-1)*-1, // 先頭1bitは符号用なので、残り31bit
IEEE754_32BIT_MAX = Math.pow(2, IEEE754_MAX_LENGTH-1),
IEEE754_ERROR_MESSAGE = "入力された値が正しくありません";

function numberToIEEE754bits(n){
  var sign=null, exponent=0, fraction=0, bits=[];
  if(!isNaN(n) && IEEE754_32BIT_MIN<n && n<=IEEE754_32BIT_MAX){
    //               負  正
    sign = (n < 0) ? 1 : 0;
    if(sign === 1){
      n *= -1
    };
    if(n === 0){
      exponent = 0;
      fraction = 0;
    }else if(n === 1/0){ // Infinity
      exponent = IEEE754_EXPONENT_MAX;
      fraction = 0;
    }else if(isNaN(n)){ // NaN
      exponent = IEEE754_EXPONENT_MAX;
      fraction = IEEE754_NAN_FRACTION;
    }else{
      exponent = Math.floor(Math.log(n) / Math.LN2);
      fraction = Math.floor(n * Math.pow(2, IEEE754_FRACTION_LENGTH - exponent));
      exponent += IEEE754_E_MAX;
    };
    for(var i=0,bit; i<IEEE754_FRACTION_LENGTH; i++){
      bits.unshift(bit = fraction % 2);
      fraction = (fraction - bit) / 2;
    };
    for(var i=0,bit; i<IEEE754_EXPONENT_MAX_LENGTH; i++){
      bits.unshift(bit = exponent % 2);
      exponent = (exponent - bit) / 2;
    };
    bits.unshift(sign);
  };
  return bits;
};

function IEEE754bitsToNumber(b){
  var sign=null, exponent=[], fraction=[1], bits=[], num=null;
  if(b.length <= IEEE754_MAX_LENGTH){
    num = 0;
    b = ("0".times(IEEE754_MAX_LENGTH) + b).slice(IEEE754_MAX_LENGTH*-1);
    bits = $.map(b.split(''), function(v){ return parseInt(v,10) });
    sign = bits.shift();
    for(var i=0; i<IEEE754_EXPONENT_MAX_LENGTH; i++){
      exponent.push( bits.shift() );
    };
    for(var i=0; i<IEEE754_FRACTION_LENGTH; i++){
      fraction.push( bits.shift() );
    };
    for(var i=0,maxi=fraction.length; i<maxi; i++){
      if(fraction[i]==1){
        num += parseFloat( 1/Math.pow(2,i) )
      }
    };
    num = num * Math.pow(2, (parseInt(exponent.join(""),2) - IEEE754_E_MAX) );
    if(sign == 1){
      num *= -1
    }
  };
  return num;
};

function convertNumberToIEEE754(f){
  var bits = numberToIEEE754bits(parseFloat(f)),d=null,h=null,ef=true,em=IEEE754_ERROR_MESSAGE;
  if(0<bits.length){
    var binary = bits.join("");
    d = parseInt(binary,2);
    h = ("0".times(IEEE754_HEX_4BIT_MAX_LENGTH) + d.toString(16)).slice(IEEE754_HEX_4BIT_MAX_LENGTH*-1).toUpperCase();
    ef = false;
    em = null;
  };
  return {decimal: d, hex: h, error: ef, errorMessage: em};
};

function convertIEEE754ToNumber(h){
  var num = null,d=null,ef=true,em=IEEE754_ERROR_MESSAGE;
  if(/^[a-fA-F0-9]+$/.test(h)){
    num = IEEE754bitsToNumber(parseInt(h,16).toString(2));
    if(num!=null){
      ef = false;
      em = null;
    }
    }
  return {decimal: num, error: ef, errorMessage: em};
};

