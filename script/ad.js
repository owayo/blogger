;(function() {
  function insertAd() {
    $.each(['2352769121', '6815113533'], function(_i, slot) {
      if ($('#ad-in-article-' + slot).length > 0) {
        return
      }
      const $wrapper = $(
        '<div id="ad-in-article-' + slot + '" class="adgoogle-wrapper">'
      )
      const $ad = $(
        '<ins class="adsbygoogle" style="display:block; text-align:center;">'
      )
        .attr('data-ad-layout', 'in-article')
        .attr('data-ad-format', 'fluid')
        .attr('data-ad-client', 'ca-pub-9656522470712614')
        .attr('data-ad-slot', slot)
      const $script = $('<script>').text(
        '(adsbygoogle = window.adsbygoogle || []).push({});'
      )
      $wrapper.append($ad).append($script)
      const $target = $('.post-body.entry-content>*:not(.adgoogle-wrapper)')
      const index = Math.floor(Math.random() * $target.length)
      $target.eq(index).after($wrapper)
    })
  }
  insertAd()
})(window)
