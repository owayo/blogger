var Logroid = Logroid || {};

Logroid.related_posts = Logroid.related_posts || (function(logroid) {
  function getLabel($entry) {
    var $labels = $entry.find('.post-footer .post-labels a[rel=tag]');
    if ($labels.length > 0) {
      return $.map($labels, function(m) {
        return $(m).attr('href').split('/').pop();
      });
    }
    return null;
  }

  function getFeed(label) {
    console.info(label)
    $.ajax({
      url: "https://query.yahooapis.com/v1/public/yql?q=select%20updated%2Ctitle%2Clink%20from%20rss%20where%20url%20%3D%20'https%3A%2F%2Flogroid.blogspot.com%2Ffeeds%2Fposts%2Fdefault%2F-%2F" + label + "%3Falt%3Drss'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
      type: 'GET',
      cache: false,
      dataType: 'json',
      timeout: 5000,
      success: function(res, status) {
        console.dir(res);
      },
      error: function(req, status, errorThrown) {
        console.dir(req);
        console.dir(status);
        console.dir(errorThrown);
      }
    });
  }
  return {
    start: function() {
      $('div.post.hentry').each(function(i, entry) {
        var $entry = $(entry),
          labels = getLabel($entry);
        $.each(labels, function(ii, label) {
          getFeed(label);
        });
      });
    }


  };
})(Logroid);

Logroid.related_posts.start();