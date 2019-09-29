// Flickr API key
var apiKey = "eafb4a17171e01a40ad9a518034995e3";

Vue.directive("tooltip", {
  bind: function(el, binding){
    $(el).tooltip({
      title: binding.value,
      placement: "bottom"
    });
  },
  unbind: function(el){
    $(el).tooltip("destroy");
  }
});

new Vue({
  el: "#gallery",
  data: {
    total: null,
    cat_photos: [],
    dog_photos: []
  },
  created: function() {
    var vm = this;
    // 猫のパラメータ
    var cat_parameters = $.param({
      method: "flickr.photos.search",
      api_key: apiKey,
      text: "cat", // 検索テキスト
      sort: "interestingness-desc", // 興味深さ順
      per_page: 4, // 取得件数
      license: "4", // Creative Commons Attributionのみ
      extras: "owner_name,license", // 追加で取得する情報
      format: "json", // レスポンスをJSON形式に
      nojsoncallback: 1 // レスポンスの先頭に関数呼び出しを含めない
    });
    var cat_flickr_url = "https://api.flickr.com/services/rest/?" + cat_parameters;
    
    // 犬のパラメータ
    var dog_parameters = $.param({
      method: "flickr.photos.search",
      api_key: apiKey,
      text: "dog", // 検索テキスト
      sort: "interestingness-desc", // 興味深さ順
      per_page: 4, // 取得件数
      license: "4", // Creative Commons Attributionのみ
      extras: "owner_name,license", // 追加で取得する情報
      format: "json", // レスポンスをJSON形式に
      nojsoncallback: 1 // レスポンスの先頭に関数呼び出しを含めない
    });
    var dog_flickr_url = "https://api.flickr.com/services/rest/?" + dog_parameters;
    
    // photoオブジェクトから画像のURLを作成して返す
    function getFlickrImageURL(photo, size) {
      var url =
        "https://farm" +
        photo.farm +
        ".staticflickr.com/" +
        photo.server +
        "/" +
        photo.id +
        "_" +
        photo.secret;
      if (size) {
        // サイズ指定ありの場合
        url += "_" + size;
      }
      url += ".jpg";
      return url;
    }
    // photoオブジェクトからページのURLを作成して返す
    function getFlickrPageURL(photo) {
      return "https://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
    }
    // photoオブジェクトからaltテキストを生成して返す
    function getFlickrText(photo) {
      var text = "\"" + photo.title + "\" by " + photo.ownername;
      if (photo.license == "4") {
        // Creative Commons Attribution（CC BY）ライセンス
        text += " / CC BY";
      }
      return text;
    }

    // JSON文字列をオブジェクトに変換(猫)
    $.getJSON(cat_flickr_url, function(data) {
      if (data.stat === "ok") {
        vm.cat_photos = data.photos.photo.map(function(photo) {
          return {
            id: photo.id,
            imageURL: getFlickrImageURL(photo, "q"),
            pageURL: getFlickrPageURL(photo),
            text: getFlickrText(photo)
          };
        });
      }
    });
    
    // JSON文字列をオブジェクトに変換(犬)
    $.getJSON(dog_flickr_url, function(data) {
      if (data.stat === "ok") {
        vm.dog_photos = data.photos.photo.map(function(photo) {
          return {
            id: photo.id,
            imageURL: getFlickrImageURL(photo, "q"),
            pageURL: getFlickrPageURL(photo),
            text: getFlickrText(photo)
          };
        });
      }
    });
  },
  methods : {
    // 呼び出して利用できる関数を定義( aaa や bbb の関数名を書き換えること。関数の追加も可能 )
    aaa : function(){
      
    },
    bbb : function(){
      
    }
  }
});