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

/* ------AQUI É JS PURO-------*/
let $novoCartao = document.querySelector(".novoCartao");
let $novoCartaoConteudo = document.querySelector(".novoCartao-conteudo");

$novoCartaoConteudo.addEventListener("input", function(){
  let $error = document.querySelector(".error");
  if ($error){
    $error.remove();
  }

})

$novoCartao.addEventListener("submit", function (event){

  if (this.querySelector(".novoCartao-conteudo").value =='' &&
  !this.querySelector(".error")){
    let $msgError = document.createElement("span");
    $msgError.classList.add("error");
    $msgError.textContent = "Preencha o campo acima";

    this.insertBefore($msgError, document.querySelector(".novoCartao-salvar"))
  };
    event.preventDefault();
});

let contador = $(".cartao").length
$(".novoCartao").submit(function (event){

  let campoConteudo = $(".novoCartao-conteudo");
  let conteudo = campoConteudo.val().trim().replace(/\n/g, "<br>");

  if (conteudo){
    adicionaCartao(conteudo)
  }

  campoConteudo.val("");
  event.preventDefault();
});

function adicionaCartao(conteudo, cor){
  contador++;

  let botaoRemove = $("<button>").addClass("opcoesDoCartao-remove")
                                 .addClass("opcoesDoCartao-opcao")
                                 .attr("data-ref", contador)
                                 .text("Remover")
                                 .click(removeCartao);

  let opcoes = $("<div>").addClass("opcoesDoCartao")
                         .append(botaoRemove);

  let conteudoTag = $("<p>").addClass("cartao-conteudo")
                            .prepend(conteudo);

  let tipoCartao = decideTipoCartao(conteudo);

  $("<div>").addClass("cartao")
            .attr("id", "cartao_" + contador)
            .append(opcoes)
            .addClass(tipoCartao)
            .append(conteudoTag)
            .css("background-color", cor)
            .prependTo(".mural");
}

function decideTipoCartao(conteudo){
  let quebras = conteudo.split("<br>").length;
  let totalDeLetras = conteudo.replace(/<br>/g, " ").length;

  let ultimoMaior = "";
  conteudo.replace(/<br>/g, " ")
          .split(" ")
          .forEach(function(palavra){
            if (palavra.length > ultimoMaior.length){
              ultimoMaior = palavra;
            }
          });

    let tamMaior = ultimoMaior.length;
    let tipoCartao = "cartao--textoPequeno";

    if (tamMaior < 9 && quebras < 5 && totalDeLetras < 55) {
      tipoCartao = "cartao--textoGrande";
    } else if (tamMaior < 12 && quebras < 6 && totalDeLetras < 55){
      tipoCartao = "cartao-textoMedio";
    }

    return tipoCartao;
}

$("#busca").on("input", function(){
  let busca = $(this).val().trim();

  if(busca.length){
    $(".cartao").hide().filter(function(){
      return $(this).find(".cartao-conteudo")
                    .text()
                    .match(new RegExp(busca, "i"));
    }).show();
  }else{
    $(".cartao").show();
  }
});

$("#ajuda").click(function(){
  $.getJSON("https://ceep.herokuapp.com/cartoes/instrucoes", function(res){
    res.instrucoes.forEach(function(instrucao){
      adicionaCartao(instrucao.conteudo, instrucao.cor);
    })
  })

});
