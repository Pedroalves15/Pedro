var Ninja = (function (){
  var module = {};

  var errors = new NinjaErrors();

  module.ajax = function (json) {
    var xhr = new XMLHttpRequest ();

    var option = {
      url : json.url
      method : json.method
      success : json.sucess
      error : json.error;
    }
    xhr.addEventListener('load', function(){
      if (xhr.status.toString().match(/2[0-9]{2}/)){
        option.success();
      };
    });
    xhr.addEventListener('error', function(){
      option.error();
    });
    xhr.send();
};

return{
  ajax: module.ajax
}
});
