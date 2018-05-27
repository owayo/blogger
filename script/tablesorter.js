$(function() {
  $('table.tablesorter:not([data-tablesorter-widgets])').tablesorter({
    theme: 'materialize',
    widthFixed: true,
    widgets: ["zebra"]
  });
  $('table.tablesorter[data-tablesorter-widgets]').each(function(i, table) {
    var $table = $(table),
      widget = $table.data('tablesorter-widgets'),
      widgetOption = {};
    if (widget.indexOf('columnSelector') > -1) {
      var $fieldSet = $('<fieldset>'),
        $legend = $('<legend>').text('表示カラム選択'),
        $columnSelector = $('<div class="column-selector">');
      $fieldSet.append($legend).append($columnSelector);
      $table.before($fieldSet);
      widgetOption = $.extend(widgetOption, {
        columnSelector_container: $columnSelector,
        columnSelector_classHasSpan: 'has-span',
        columnSelector_layout: '<label><input type="checkbox">{name}</label>',
        columnSelector_mediaquery: false,
      });
    }

    $table.tablesorter({
      theme: 'materialize',
      widthFixed: true,
      widgets: widget,
      widgetOptions: widgetOption
    });
  });
});