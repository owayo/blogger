function freeAppToggle(event) {
  var $cb = $(event.target),
    $pb = $cb.parents('.post-body'),
    $table = $pb.find('table.application_infomation');
  if ($cb.is(':checked')) {
    $table.addClass('free-only');
  } else {
    $table.removeClass('free-only');
  }
}