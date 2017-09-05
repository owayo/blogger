var entity={
  '&':'&amp;',
  '¦':'&brvbar;',
  'µ':'&micro;',
  '‰':'&permil;',
  '¤':'&curren;',
  '€':'&euro;',
  '¢':'&cent;',
  '£':'&pound;',
  '¥':'&yen;',
  '©':'&copy;',
  '®':'&reg;',
  '™':'&trade;',
  '↑':'&uarr;',
  '→':'&rarr;',
  '↓':'&darr;',
  '←':'&larr;',
  '↔':'&harr;',
  '⇑':'&uArr;',
  '⇒':'&rArr;',
  '⇓':'&dArr;',
  '⇐':'&lArr;',
  '⇔':'&hArr;',
  '♠':'&spades;',
  '♣':'&clubs;',
  '♥':'&hearts;',
  '♦':'&diams;',
  'ª':'&ordf;',
  'º':'&ordm;',
  '¹':'&sup1;',
  '²':'&sup2;',
  '³':'&sup3;',
  '½':'&frac12;',
  '¼':'&frac14;',
  '¾':'&frac34;',
  '·':'&middot;',
  '¡':'&iexcl;',
  '¿':'&iquest;',
  '"':'&quot;',
  '‘':'&lsquo;',
  '’':'&rsquo;',
  '“':'&ldquo;',
  '”':'&rdquo;',
  '«':'&laquo;',
  '»':'&raquo;',
  ' ':'&nbsp;',
  ' ':'&emsp;',
  ' ':'&ensp;',
  ' ':'&thinsp;',
  '—':'&mdash;',
  '–':'&ndash;',
  '­':'&shy;',
  '•':'&bull;',
  '¶':'&para;',
  '§':'&sect;',
  '†':'&dagger;',
  '‡':'&Dagger;',
  '…':'&hellip;',
  '◊':'&loz;',
  '∞':'&infin;',
  '√':'&radic;',
  '−':'&minus;',
  '±':'&plusmn;',
  '×':'&times;',
  '÷':'&divide;',
  '≠':'&ne;',
  '≈':'&asymp;',
  '≅':'&cong;',
  '>':'&gt;',
  '<':'&lt;',
  '≥':'&ge;',
  '≤':'&le;',
  'ƒ':'&fnof;',
  '∝':'&prop;',
  '′':'&prime;',
  '″':'&Prime;',
  '∫':'&int;',
  '∂':'&part;',
  '∇':'&nabla;',
  '∑':'&sum;',
  '∏':'&prod;',
  'ℑ':'&image;',
  'ℜ':'&real;',
  '℘':'&weierp;',
  '∼':'&sim;',
  '∴':'&there4;',
  'ϖ':'&piv;',
  '∠':'&ang;',
  '°':'&deg;',
  '⊥':'&perp;',
  '≡':'&equiv;',
  '¬':'&not;',
  '∀':'&forall;',
  '∃':'&exist;',
  '∧':'&and;',
  '∨':'&or;',
  '∅':'&empty;',
  '∩':'&cap;',
  '∪':'&cup;',
  '∈':'&isin;',
  '∉':'&notin;',
  '∋':'&ni;',
  '⊂':'&sub;',
  '⊃':'&sup;',
  '⊄':'&nsub;',
  '⊆':'&sube;',
  '⊇':'&supe;',
  '⋅':'&sdot;',
  '∗':'&lowast;',
  '⊕':'&oplus;',
  '⊗':'&otimes;',
  '⌈':'&lceil;',
  '⌊':'&lfloor;',
  '⌉':'&rceil;',
  '⌋':'&rfloor;',
  '´':'&acute;',
  '¸':'&cedil;',
  'ˆ':'&circ;',
  '¯':'&macr;',
  '˜':'&tilde;',
  '¨':'&uml;',
  'á':'&aacute;',
  'Á':'&Aacute;',
  'â':'&acirc;',
  'Â':'&Acirc;',
  'æ':'&aelig;',
  'Æ':'&AElig;',
  'à':'&agrave;',
  'À':'&Agrave;',
  'å':'&aring;',
  'Å':'&Aring;',
  'ã':'&atilde;',
  'Ã':'&Atilde;',
  'ä':'&auml;',
  'Ä':'&Auml;',
  'ç':'&ccedil;',
  'Ç':'&Ccedil;',
  'é':'&eacute;',
  'É':'&Eacute;',
  'ê':'&ecirc;',
  'Ê':'&Ecirc;',
  'è':'&egrave;',
  'È':'&Egrave;',
  'ð':'&eth;',
  'Ð':'&ETH;',
  'ë':'&euml;',
  'Ë':'&Euml;',
  'í':'&iacute;',
  'Í':'&Iacute;',
  'î':'&icirc;',
  'Î':'&Icirc;',
  'ì':'&igrave;',
  'Ì':'&Igrave;',
  'ï':'&iuml;',
  'Ï':'&Iuml;',
  'ñ':'&ntilde;',
  'Ñ':'&Ntilde;',
  'ó':'&oacute;',
  'Ó':'&Oacute;',
  'ô':'&ocirc;',
  'Ô':'&Ocirc;',
  'ò':'&ograve;',
  'Ò':'&Ograve;',
  'ø':'&oslash;',
  'Ø':'&Oslash;',
  'õ':'&otilde;',
  'Õ':'&Otilde;',
  'ö':'&ouml;',
  'Ö':'&Ouml;',
  'œ':'&oelig;',
  'Œ':'&OElig;',
  'ß':'&szlig;',
  'š':'&scaron;',
  'Š':'&Scaron;',
  'þ':'&thorn;',
  'Þ':'&THORN;',
  'ú':'&uacute;',
  'Ú':'&Uacute;',
  'û':'&ucirc;',
  'Û':'&Ucirc;',
  'ù':'&ugrave;',
  'Ù':'&Ugrave;',
  'ü':'&uuml;',
  'Ü':'&Uuml;',
  'ý':'&yacute;',
  'Ý':'&Yacute;',
  'ÿ':'&yuml;',
  'Ÿ':'&Yuml;',
  'Α':'&Alpha;',
  'α':'&alpha;',
  'Β':'&Beta;',
  'β':'&beta;',
  'Γ':'&Gamma;',
  'γ':'&gamma;',
  'Δ':'&Delta;',
  'δ':'&delta;',
  'Ε':'&Epsilon;',
  'ε':'&epsilon;',
  'Ζ':'&Zeta;',
  'ζ':'&zeta;',
  'Η':'&Eta;',
  'η':'&eta;',
  'Θ':'&Theta;',
  'θ':'&theta;',
  'Ι':'&Iota;',
  'ι':'&iota;',
  'Κ':'&Kappa;',
  'κ':'&kappa;',
  'Λ':'&Lambda;',
  'λ':'&lambda;',
  'Μ':'&Mu;',
  'μ':'&mu;',
  'Ν':'&Nu;',
  'ν':'&nu;',
  'Ξ':'&Xi;',
  'ξ':'&xi;',
  'Ο':'&Omicron;',
  'ο':'&omicron;',
  'Π':'&Pi;',
  'π':'&pi;',
  'Ρ':'&Rho;',
  'ρ':'&rho;',
  'Σ':'&Sigma;',
  'σ':'&sigma;',
  'Τ':'&Tau;',
  'τ':'&tau;',
  'Υ':'&Upsilon;',
  'υ':'&upsilon;',
  'Φ':'&Phi;',
  'φ':'&phi;',
  'Χ':'&Chi;',
  'χ':'&chi;',
  'Ψ':'&Psi;',
  'ψ':'&psi;',
  'Ω':'&Omega;',
  'ω':'&omega;'
};
var entityChar=[];
for(k in entity){
    entityChar.push(k);
};
function replaceHtmlEntity(v){
  var c="";
  for(var i=0,maxi=v.length; i<maxi; i++){
    if($.inArray(v.charAt(i),entityChar) != -1){
      c+=entity[v.charAt(i)];
    }else{
      c+=v.charAt(i);
    }
  };
  return c;
};
function preEscape(v){
  if($.support.htmlSerialize){
    v=$('<div>').text(v).html();
  }else{
    v=$('<textarea>').val(v).html();
  }
  return v;
};
function htmlEntityEscape(v){
  return replaceHtmlEntity(v);
};
function codeEscape(v){
  var c="",n;
  for(var i=0,maxi=v.length; i<maxi; i++){
    n=v.charCodeAt(i);
    c+='&#'+n+';';
  };
  return c;
};
function htmlEntityCodeEscape(v){
  var c="",n;
  for(var i=0,maxi=v.length; i<maxi; i++){
    if($.inArray(v.charAt(i),entityChar) != -1){
      c+=replaceHtmlEntity(v.charAt(i));
    }else{
      n=v.charCodeAt(i);
      c+='&#'+n+';';
    }
  };
  return c;
};
function contentEscape(v){
  var c="";
  for(var i=0,maxi=v.length; i<maxi; i++){
    c+='\\'+v.charCodeAt(i).toString(16);
  }
  return c;
};
function entityUnEscape(v){
  return $('<div>').html(v).text();
};
function contentUnEscape(v){
  var h="",c="";
  while(/(\\[0-9a-f]+)/i.test(v)){
    h=RegExp.$1;
    c=String.fromCharCode(parseInt(h.replace(/^\\/,''),16));
    v=v.replace(new RegExp(h.replace(/^\\/,'\\\\'),'gi'),c);
  }
  return v;
};
function stringTocharCode(v){
  var a=[];
  for(var i=0,maxi=v.length; i<maxi; i++){
    a.push(v.charCodeAt(i));
  };
  return a;
};
function charCodeToString(v){
  var str=[];
  v.replace(/(?:String\.fromCharCode\()?\s*((?:\s*\d+\s*,?\s*)+)\s*\)?/g,function(m){
    var ns=RegExp.$1.replace(/[^\d,]+/g,'').split(",");
    str.push($.map(ns, function(n){return String.fromCharCode(parseInt(n,10))}).join(""));
  });
  return str;
};
