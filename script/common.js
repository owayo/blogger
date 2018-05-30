// 文字列の先頭と末尾の空白文字を除去した新しい文字列を返す
String.prototype.strip = function() {
  return this.replace(/^\s+|\s+$/g, '');
};
String.prototype.normalize = function() {
  var d = this;
  d = d.replace(/　/g, ' ');
  d = d.replace(/\s+/, ' ');
  return d
};
String.prototype.trim = function() {
  var d = this;
  return d.normalize().strip()
};
// 文字列を指定回数つなげる
String.prototype.times = function(count) {
  return count < 1 ? '' : new Array(count + 1).join(this);
};
// 文字列から、マッチ箇所を抜く
String.prototype.scan = function(pattern) {
  var result = [],
    source = this,
    match;
  if (pattern.toString().match(/\/.*\/(\w+)$/)) {
    if (/g/.test(RegExp.$1)) {
      console.error("Not allowed flag: g");
      return;
    }
  };
  while (0 < source.length) {
    if (match = source.match(pattern)) {
      result.push(source.slice(source.slice(0, match.index).length, match.index + match[0].length));
      source = source.slice(match.index + match[0].length);
    } else {
      source = '';
    }
  }
  return result;
};
String.prototype.normarize = function() {
  var i, f, c, m, d, hd, a = [];
  // 半角カタカナ -> 全角カタカナのマッピング
  m = {
    0xFF66: 0x30F2,
    0xFF67: 0x30A1,
    0xFF68: 0x30A3,
    0xFF69: 0x30A5,
    0xFF6A: 0x30A7,
    0xFF6B: 0x30A9,
    0xFF6C: 0x30E3,
    0xFF6D: 0x30E5,
    0xFF6E: 0x30E7,
    0xFF6F: 0x30C3,
    0xFF70: 0x30FC,
    0xFF71: 0x30A2,
    0xFF72: 0x30A4,
    0xFF73: 0x30A6,
    0xFF74: 0x30A8,
    0xFF75: 0x30AA,
    0xFF76: 0x30AB,
    0xFF77: 0x30AD,
    0xFF78: 0x30AF,
    0xFF79: 0x30B1,
    0xFF7A: 0x30B3,
    0xFF7B: 0x30B5,
    0xFF7C: 0x30B7,
    0xFF7D: 0x30B9,
    0xFF7E: 0x30BB,
    0xFF7F: 0x30BD,
    0xFF80: 0x30BF,
    0xFF81: 0x30C1,
    0xFF82: 0x30C4,
    0xFF83: 0x30C6,
    0xFF84: 0x30C8,
    0xFF85: 0x30CA,
    0xFF86: 0x30CB,
    0xFF87: 0x30CC,
    0xFF88: 0x30CD,
    0xFF89: 0x30CE,
    0xFF8A: 0x30CF,
    0xFF8B: 0x30D2,
    0xFF8C: 0x30D5,
    0xFF8D: 0x30D8,
    0xFF8E: 0x30DB,
    0xFF8F: 0x30DE,
    0xFF90: 0x30DF,
    0xFF91: 0x30E0,
    0xFF92: 0x30E1,
    0xFF93: 0x30E2,
    0xFF94: 0x30E4,
    0xFF95: 0x30E6,
    0xFF96: 0x30E8,
    0xFF97: 0x30E9,
    0xFF98: 0x30EA,
    0xFF99: 0x30EB,
    0xFF9A: 0x30EC,
    0xFF9B: 0x30ED,
    0xFF9C: 0x30EF,
    0xFF9D: 0x30F3,
    0xFF9E: 0x309B,
    0xFF9F: 0x309C
  };
  // 濁点
  d = {
    0x30AB: 1,
    0x30ad: 1,
    0x30af: 1,
    0x30b1: 1,
    0x30b3: 1,
    0x30b5: 1,
    0x30b7: 1,
    0x30b9: 1,
    0x30bb: 1,
    0x30bd: 1,
    0x30bf: 1,
    0x30c1: 1,
    0x30c4: 1,
    0x30c6: 1,
    0x30c8: 1,
    0x30cf: 1,
    0x30d2: 1,
    0x30d5: 1,
    0x30d8: 1,
    0x30db: 1,
    0x30a6: 78
  };
  // 半濁点
  hd = {
    0x30cf: 2,
    0x30d2: 2,
    0x30d5: 2,
    0x30d8: 2,
    0x30db: 2
  };

  for (i = 0, f = this.length; i < f; i++) {
    c = this.charCodeAt(i);
    switch (true) {
      // 濁点
      case (c == 0xFF9E && a[a.length - 1] && a[a.length - 1] in d):
        a[a.length - 1] = a[a.length - 1] + d[a[a.length - 1]];
        break;
        // 半濁点
      case (c == 0xFF9F && a[a.length - 1] && a[a.length - 1] in hd):
        a[a.length - 1] = a[a.length - 1] + hd[a[a.length - 1]];
        break;
        // 全角英数記号
      case (0xFF01 <= c && c <= 0xFF5E):
        a.push(c - 0xFEE0);
        break;
        // 全角スペース
      case (c == 0x3000):
        a.push(0x0020);
        break;
        // 半角カナ -> 全角カナ
      case (c in m):
        a.push(m[c]);
        break;
      default:
        a.push(c);
        break;
    };
  };
  return String.fromCharCode.apply(null, a);
};
Array.prototype.ignoreCaseSort = function() {
  var arr = this;
  return arr.sort(function(a, b) {
    return (a.toString().toLowerCase() < b.toString().toLowerCase()) ? -1 : 1;
  });
};
Number.prototype.round = function(n) {
  var s = this,
    r = 0,
    p = 0;
  if (s.toString().indexOf(".") == -1) { return s };
  p = Math.pow(10, n);
  r = Math.round(s * p) / p;
  return r;
};
Number.prototype.thousandSeparate = function() {
  var n = this.to_i(),
    r = "";
  if (!isNaN(n)) {
    r = n.toString();
    for (var i = 0; i < (r.length / 3); i++) {
      r = r.replace(/^([0-9]+)([0-9][0-9][0-9])/, "$1,$2");
    }
  }
  return r;
};
Number.prototype.zeroPadding = function(n) {
  var s = this.toString(),
    p = "0".times(n);
  if (n <= s.length) {
    return s;
  } else {
    return (p + s).slice(-n);
  }
};
Number.prototype.omit = function() {
  return parseInt(this, 10);
};
// 文字列をIntに変換
String.prototype.to_int = function() {
  var n = parseInt(this.replace(/[^\d]+/g, ''), 10);
  return (isNaN(n)) ? '' : n;
};
// 文字列をFloatに変換
String.prototype.to_float = function() {
  return parseFloat(this);
};
// 文字列をBooleanに変換
String.prototype.to_boolean = function() {
  return (/^true$/i.test(this.strip())) ? true : false;
};
// 文字列をHex Colorに変換
String.prototype.to_hexcolor = function() {
  var s = this,
    p = "0".times(6);
  return (p + s).slice(-6);
};
String.prototype.zeroPadding = function(n) {
  var s = this,
    p = "0".times(n);
  if (n <= s.length) {
    return s;
  } else {
    return (p + s).slice(-n);
  }
};
// ゼロパディングした日付のハッシュを返す
Date.prototype.getPaddingDate = function() {
  var d = this;
  return { year: d.getFullYear(), month: (d.getMonth() + 1).zeroPadding(2), day: d.getDate().zeroPadding(2), hour: d.getHours().zeroPadding(2), minute: d.getMinutes().zeroPadding(2), second: d.getSeconds().zeroPadding(2) }
};
// logroidか
String.prototype.is_logroid = function() {
  var u = this;
  if (/\/\/logroid\.blogspot\.(com|jp)/.test(u)) {
    return true;
  } else {
    return false;
  }
};
String.prototype.bloggerURLNormalize = function() {
  var u = this;
  if (u.is_logroid) {
    u = u.replace(/:\/\/logroid\.blogspot\.jp\//, '://logroid.blogspot.com/');
  };
  return u;
};

function Object2Text(obj) {
  return uneval(obj);
};
// Web Storage
function StorageSupport() {
  var r = false;
  if (localStorage && localStorage.setItem && localStorage.getItem && localStorage.removeItem) {
    r = true;
  };
  return r;
};

function getPostCount() {
  return ($("#ArchiveList span.post-count:first").text()).to_int();
};

function StorageKeyExist(keys) {
  var r = true,
    now = new Date(),
    nowMs = now.getTime();
  if (localStorage) {
    for (var i = 0, maxi = keys.length; i < maxi; i++) {
      var key = localStorage[keys[i]] ? keys[i] : localStorage[keys[i] + '_key'] ? keys[i] + '_key' : null;
      if (key == null) {
        r = false;
        break;
      } else if (localStorage[key] + (1000 * 60 * 60 * 24) < nowMs) {
        r = false;
        break;
      }
    }
  };
  return r;
};

function StorageSave(key, obj, k) {
  if (localStorage && localStorage.setItem) {
    if (arguments.length == 2) {
      var now = new Date();
      k = now.getTime();
    }
    localStorage.setItem(key + "_key", (typeof k == 'string') ? k : k.toString());
    localStorage.setItem(key, Object2Text(obj));
  }
};

function StorageLoad(key) {
  var r = null;
  if (localStorage && localStorage.getItem && localStorage[key]) {
    console.info('localStorage get. (' + key + ')');
    r = { key: localStorage.getItem(key + "_key"), data: localStorage.getItem(key) }
      //    console.dir(r);
  };
  return r;
};

function StorageRemove(keys) {
  if (localStorage && localStorage.removeItem) {
    for (var i = 0, maxi = keys.length; i < maxi; i++) {
      if (localStorage[keys[i]]) {
        localStorage.removeItem(keys[i] + "_key");
        localStorage.removeItem(keys[i]);
      }
    }
  }
};
// イベントをキャンセル
function cancel(e) {
  if (e.preventDefault) {
    e.preventDefault();
  };
  if (e.stopPropagation) {
    e.stopPropagation();
  }
};
// バリデーションを行う
function validator() {
  function numberValidate(e) {
    if (e.shiftKey) {
      cancel(e);
    };
    // Ctrlを押しながらは許可
    // BackSpace、Deleteも許可
    if (!e.ctrlKey && e.keyCode != 8 && e.keyCode != 46) {
      // 数字は許可
      if (48 <= e.keyCode && e.keyCode <= 57) {} else {
        cancel(e);
      }
    }
    var o = $(e.target);
    o.val(o.val().to_int());
  };

  function floatValidate(e) {
    if (e.shiftKey) {
      cancel(e);
    };
    // Ctrlを押しながらは許可
    // BackSpace、Deleteも許可
    if (!e.ctrlKey && e.keyCode != 8 && e.keyCode != 46) {
      // 数字、ドットは許可
      if (48 <= e.keyCode && e.keyCode <= 57 || e.keyCode == 190) {} else {
        cancel(e);
      }
    }
    var o = $(e.target);
    o.val(o.val().to_float());
  };

  function hexColorValidate(e) {
    // Ctrlを押しながらは許可
    // BackSpace、Deleteも許可
    if (e.keyCode != 8 && e.keyCode != 46) {
      // 数字、A-Fは許可
      if (48 <= e.keyCode && e.keyCode <= 57 || 65 <= e.keyCode && e.keyCode <= 70) {} else {
        cancel(e);
      }
    }
    var o = $(e.target);
    o.val(o.val().replace(/[^a-f\d]+/gi, '').slice(0, 6));
  };
  $('input[validate=number]').keyup(numberValidate);
  $('input[validate=float]').keyup(floatValidate);
  $('input[validate=hexcolor]').keyup(hexColorValidate);
};

function getParameter() {
  var obj = {},
    param, kv;
  param = $.map(document.location.search.substring(1).split('&'), function(m) { if (m != "") { return m } });
  for (var i = 0, maxi = param.length; i < maxi; i++) {
    kv = param[i].split('=');
    obj[kv[0]] = decodeURIComponent(kv[1]);
  };
  return obj;
};

function elementLoadCallback(selector, func) {
  var $ele = $(selector);
  if ($ele.length > 0) {
    func($ele);
  } else {
    setTimeout(function() { elementLoadCallback(selector, func); }, 100);
  }
}
var LOGGER = null;
$(window).trigger('commonLoaded');