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
    if (feed[label] == null) {
      feed[label] = []
    }
    feed[label].push({
      link: json.link,
      title: json.title,
      updated: json.updated,
      date: Date.parse(json.updated)
    });
  }

  function getLabelFeed(labels) {
    var f = [];
    $.each(labels, function(i, l) {
      f.push(feed[l]);
    });
    f = Array.prototype.concat.apply([], f);
    f.sort(function(a, b) {
      return b - a;
    });
    if (f.length > 5) {
      return f.slice(0, 5)
    }
    return f
  }

  function drawRelatedPost() {
    console.dir(feed);
    console.dir(this.$entries);
    this.$entries.each(function(i, entry) {
      var $entry = $(entry),
        $related = $entry.find('.post-related'),
        $list = $related.find('.list'),
        labels = getLabel($entry);
      $.each(getLabelFeed(labels), function(i, f) {
        $list.append($('<li>').append($('<a>').text(f.title).attr('href', f.link)));
      });
    });
  }

  function getFeed(labels, index) {
    if (labels.length <= index) {
      drawRelatedPost();
      return
    }
    var label = labels[index];
    if (StorageKeyExist([KEY_PREFIX + label])) {
      addFeed(label, JSON.parse(StorageLoad(KEY_PREFIX + label)));
      getFeed(labels, index + 1);
    } else {
      // https://developer.yahoo.com/yql/
      $.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20updated%2Ctitle%2Clink%20from%20rss(0%2C5)%20where%20url%20%3D%20'https%3A%2F%2Flogroid.blogspot.com%2Ffeeds%2Fposts%2Fdefault%2F-%2F" + label + "%3Falt%3Drss'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", function(json) {
        console.dir(json);
        if (json != null && json.query != null && json.query.results != null && json.query.results.item != null) {
          $.each(json.query.results.item, function(i, item) {
            StorageSave(KEY_PREFIX + label, JSON.stringify(item));
            addFeed(label, item);
          });
        }
        getFeed(labels, index + 1);
      });
    }
  }
  return {
    start: function() {
      var labels = []
      this.$entries = $('.post.hentry');
      this.$entries.each(function(i, entry) {
        labels.push(getLabel($(entry)));
      });
      labels = Array.prototype.concat.apply([], labels);
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