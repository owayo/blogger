var Logroid = Logroid || {};

Logroid.related_posts = Logroid.related_posts || (function(logroid) {
  var feed = [];

  function getLabel($entry) {
    var $labels = $entry.find('.post-footer .post-labels a[rel=tag]');
    if ($labels.length > 0) {
      return $.map($labels, function(m) {
        return $(m).attr('href').split('/').pop();
      });
    }
    return null;
  }

  function addFeed(json) {
    feed.push({
      link: json.link,
      title: json.title,
      updated: Date.parse(json.updated)
    });
  }

  function drawFeed() {
    console.dir(feed)
  }

  function getFeed(labels, index) {
    if (labels.length <= index) {
      drawFeed();
    }
    // https://developer.yahoo.com/yql/
    var label = labels[index];
    $.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20updated%2Ctitle%2Clink%20from%20rss%20where%20url%20%3D%20'https%3A%2F%2Flogroid.blogspot.com%2Ffeeds%2Fposts%2Fdefault%2F-%2F" + label + "%3Falt%3Drss'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", function(json) {
      console.dir(json);
      $.each(json.query.results.item, function(i, item) {
        addFeed(item);
      });
      if (labels.length > index + 1) {
        getFeed(labels, index + 1)
      }
    });
  }
  return {
    start: function() {
      var labels = []
      $('.post.hentry').each(function(i, entry) {
        var $entry = $(entry);
        labels.push(getLabel($entry));
      });
      Array.prototype.concat.apply([], labels);
      labels = labels.filter(function(x, i, self) {
        return self.indexOf(x) === i;
      });
      console.dir(labels);
      getFeed(labels, 0);
    }


  };
})(Logroid);
$(function() {
  function check(selector, func) {
    if ($(selector).length > 0) {
      func();
    } else {
      setTimeout(function() { check(selector, func) }, 100);
    }
  }
  check('.post.hentry', function() { Logroid.related_posts.start(); })
});