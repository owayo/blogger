function freeAppToggle(input) {
  var $cb = $(input),
    $pb = $cb.parents('.post-body'),
    $table = $pb.find('table.application_infomation');
  if ($cb.is(':checked')) {
    $table.addClass('free-only');
  } else {
    $table.removeClass('free-only');
  }
}