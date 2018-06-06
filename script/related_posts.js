var Logroid = Logroid || {};

Logroid.related_posts = Logroid.related_posts || (function(logroid) {
  var KEY_PREFIX = 'related_posts-';
  var feed = {};
  var $entries = null;

  function getLabel($entry) {
    var $labels = $entry.find('.post-footer .post-labels a[rel=tag]');
    if ($labels.length > 0) {
      return $.map($labels, function(m) {
        return $(m).attr('href').split('/').pop();
      });
    }
    return null;
  }

  function addFeed(label, json) {
    if (Object.keys(feed).indexOf(label) == -1) {
      feed[label] = []
    }
    feed[label].push({
      link: json.link,
      title: json.title,
      updated: json.updated,
      date: Date.parse(json.updated)
    });
  }

  function getLabelsFeed(labels, excludeUrl) {
    var f = [],
      uniq = [],
      urls = [];
    $.each(labels, function(i, l) {
      f.push(feed[l]);
    });
    f = Array.prototype.concat.apply([], f);
    $.each(f, function(i, ff) {
      if (ff.link != excludeUrl && urls.indexOf(ff.link) == -1) {
        uniq.push(ff);
      }
      urls.push(ff.link);
    });
    uniq.sort(function(a, b) {
      return b - a;
    });
    uniq = uniq.uniq();
    if (uniq.length > 5) {
      return uniq.slice(0, 5)
    }
    return uniq
  }

  function drawRelatedPost() {
    console.dir(feed);
    logroid.related_posts.$entries.each(function(i, entry) {
      var $entry = $(entry),
        $related = $entry.find('.post-related'),
        $list = $related.find('.list'),
        labels = getLabel($entry),
        $url = $('link[rel="canonical"]'),
        url = null;
      if ($url.length > 0) {
        url = $url.attr('href');
      } else {
        url = $entry.find('.post-title.entry-title>a').attr('href');
      }
      var feedList = getLabelsFeed(labels, url);
      if (feedList.length == 0) {
        return;
      }
      $.each(feedList, function(i, f) {
        $list.append($('<li>').append($('<a>').text(f.title).attr('href', f.link)));
      });
      $related.fadeIn('slow');
    });
  }

  function getFeed(labels, index) {
    if (labels.length <= index) {
      drawRelatedPost();
      return
    }
    var label = labels[index];
    if (StorageKeyExist([KEY_PREFIX + label])) {
      $.each(eval(StorageLoad(KEY_PREFIX + label).data), function(i, item) {
        addFeed(label, item);
      });
      getFeed(labels, index + 1);
    } else {
      // https://developer.yahoo.com/yql/
      $.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20updated%2Ctitle%2Clink%20from%20rss(0%2C5)%20where%20url%20%3D%20'https%3A%2F%2Flogroid.blogspot.com%2Ffeeds%2Fposts%2Fdefault%2F-%2F" + label + "%3Falt%3Drss'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", function(json) {
        console.dir(json);
        if (json != null && json.query != null && json.query.results != null && json.query.results.item != null) {
          var items = [json.query.results.item].flatten();
          StorageSave(KEY_PREFIX + label, items);
          $.each(items, function(i, item) {
            addFeed(label, item);
          });
        }
        getFeed(labels, index + 1);
      });
    }
  }
  return {
    start: function($entries) {
      var labels = [];
      this.$entries = $entries;
      this.$entries.each(function(i, entry) {
        labels.push(getLabel($(entry)));
      });
      labels = labels.flatten();
      labels = labels.uniq();
      console.dir(labels);
      getFeed(labels, 0);
    }
  };
})(Logroid);
$(function() {
  elementLoadCallback('.post.hentry', function($entries) { Logroid.related_posts.start($entries); })
});