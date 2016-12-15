(function (){
  'use strict';

  var n = new Ninja();

  //https:///ceep.herokuapp.com/cartoes/instrucoes
  n.ajax({
    url:'',
    method:'GET',
    sucess : function(){
      console.log('SUCCESS');
    },
    error : function(){
      console.log('ERROR');
    }
})
})();
