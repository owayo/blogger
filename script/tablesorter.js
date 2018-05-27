$(function() {
  $('table.tablesorter:not([data-tablesorter-widgets])').tablesorter({
    theme: "materialize",
    widgets: ["zebra"],
  });
  $('table.tablesorter[data-tablesorter-widgets]').each(function(i, table) {
    var $table = $(table),
      widget = $table.data('tablesorter-widgets');
    $table.tablesorter({
      widgets: widget
    });
  });
});