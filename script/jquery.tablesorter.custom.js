var ts=$.tablesorter;
ts.addParser(
  {
    id: "yyyy/mm/dd hhmmss",
    is: function (s) {
        return /^\d{4}[\/-]\d{2}[\/-]\d{2} \d{2}:\d{2}:\d{2}$/.test(s);
    }, format: function (s) {
        return $.tablesorter.formatFloat((s != "") ? new Date(s.replace(
        new RegExp(/-/g), "/")).getTime() : "0");
    }, type: "numeric"
  }
);
ts.grouping.types["text"] = function(c, column, txt, num, group){
  return txt
};

