var AwsProductAdvertisingAPIReader=function(selector,maxDispNum,opt){
  if (selector && selector!="") {
    var target=$(selector);
    if (0<target.length && 0<maxDispNum) {
      opt = $.extend({
        Condition:"New",
        MerchantId: "Amazon",
        Operation: "ItemSearch",
        ResponseGroup: "ItemAttributes,Images,Reviews",
        SearchIndex: "All",
        Sort: "salesrank"
      }, opt);
      
      console.dir(opt)
      for(var k in opt){
        if(k!="ResponseGroup"){
          opt[k]=encodeURIComponent(opt[k]);
        }
      };
      console.dir(opt)

        $.ajax({
          url:'../aws',
          data : opt,
          dataType : 'jsonp',
          success : function(jsonp){
            console.info(jsonp["signed-url"])
          }
        });

    }
  }
};
