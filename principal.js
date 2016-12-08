document.querySelector("#mudaLayout").addEventListener("click", function(){

  var mural = document.querySelector(".mural");

  mural.classList.toggle("mural--linhas");

  if (mural.classList.contains("mural--linhas")){
    this.textContent = "Blocos";
  } else {
    this.textContent = "Linhas";
  }
});

function removeCartao() {
  var cartao = document.querySelector("#cartao_" + this.getAttribute("data-ref"));

  cartao.classList.add("cartao--some");

  setTimeout(function(){
    cartao.remove();
  },400);
}

var botoes = document.querySelectorAll(".opcoesDoCartao-remove");

for (var i = 0; i < botoes.length; i++){
  botoes[i].addEventListener("click", removeCartao);
};


let $novoCartao = document.querySelector(".novoCartao");
let $novoCartaoConteudo = document.querySelector(".novoCartao-conteudo");

$novoCartaoConteudo.addEventListener("input", function(){
  let $error = document.querySelector(".error");
  if ($error){
    $error.remove();
  }

})

$novoCartao.addEventListener("submit", function (event){
  event.preventDefault();
  if (this.querySelector(".novoCartao-conteudo").value =='' &&
  !this.querySelector(".error")){
    let $msgError = document.createElement("span");
    $msgError.classList.add("error");
    $msgError.textContent = "Preencha o campo acima";

    this.insertBefore($msgError, document.querySelector(".novoCartao-salvar"))
  };

});
