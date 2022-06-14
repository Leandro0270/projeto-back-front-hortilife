//Desenvolvido por: Patricia Sycko (42126460) e Leandro Silva (42127882)



const URL = "http://localhost:3000/produtos"

//Executa a função que chama todos os cards cadastrados no banco
firstLoadPage();

//Exclui todos cards ao ser chamado 
function esconderConteudos(){
  var elementos = document.querySelector("#elementos");
  elementos.parentNode.removeChild(elementos);
  
}

//Faz a requisição para excluir um produto pelo id!
async function excluirConteudos(id){
  var deleteUrl = URL + "/" + id
  const resp = await fetch(deleteUrl, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8' 
      },
  })
  const conteudo = await resp.json();
    if(!resp.ok){
      alert("Erro ao tentar excluir!")
    }
    else{
      alert("O produto foi excluído com sucesso!")
      document.location.reload(true);
    }
}


//Salva as informações de um produto no localStorage e te redireciona para a página de edição de conteudo
function editItem(id){
  localStorage.setItem("editId", id)
  window.location.href = "add.html"
}
async function firstLoadPage(){
  var start = document.querySelector("#start");
  start.innerHTML += `<div id="elementos"></div>`
  const resp = await fetch(URL);
  const json = await resp.json();
  mostrarProdutos(json)

}

//Gera todos os card de um json
async function mostrarProdutos(json){
  var numCard = 1
  var idList = [json.length]
  var nameList = [json.length]
  var validadeList = [json.length]
  var precoList = [json.length]
  var fornecedorList = [json.length]
  var urlList = [json.length]
  for(var i = 0; i<json.length; i++){
    idList[i] = json[i]._id
    nameList[i] = json[i].nome
    validadeList[i] = json[i].validade
    precoList[i] = json[i].preco
    fornecedorList[i] = json[i].fornecedor
    urlList[i] = json[i].categoria

  }
  var card = document.querySelector("#elementos");
  for(var i = 0; i<json.length; i++){
    card.innerHTML += `<div class="card" id="card${numCard}">`
    var elementos = document.querySelector(`#card${numCard}`);
    elementos.innerHTML += `<p class="nome">Produto: ${nameList[i]} </p>`
    elementos.innerHTML += `<p class="validade">Validade: ${validadeList[i]} </p>`
    elementos.innerHTML += `<p class="preco">Preço: R$ ${precoList[i]} </p>`
    elementos.innerHTML += `<p class="fornecedor">Fornecedor: ${fornecedorList[i]} </p>`
    elementos.innerHTML += `<img class="trash" src="./images/trash-bin.svg" onclick="excluirConteudos('${json[i]._id}')">`
    elementos.innerHTML += `<img class="pencil" src="./images/pencil.svg" onclick="editItem('${json[i]._id}')">`
    elementos.innerHTML += `<img class="url" src="${urlList[i]}">`
    numCard++
   }
}


//Função que faz a procura de algum produto ao digitar algo na barra de pesquisa e ser chamada
async function procurarProduto(){
  pesquisa = document.querySelector("#pesquisa").value
  if(pesquisa === "" || pesquisa.trim() ===""){
    esconderConteudos()
    firstLoadPage()
  }
  else{
    var a = 0
    const resp = await fetch(URL);
    const resposta = await resp.json();
    var idList = []
    var jsonList = []
    for (let index = 0; index < resposta.length; index++) {
      if(pesquisa == resposta[index].nome){
        idList[index] = resposta[index]._id
        a = 1
      }
    }
    idList = idList.filter(function( element ) {
      return element !== undefined;
   });

    if(a === 1){
      for (let index = 0; index < idList.length; index++) {
        const URLID = `${URL}` + "/" + `${idList[index]}`
        const resp1 = await fetch(URLID);
        const json = await resp1.json();
        jsonList[index] = json;
      }
      esconderConteudos();
      var start = document.querySelector("#start");
      start.innerHTML += `<div id="elementos"></div>`
      mostrarProdutos(jsonList)
    }else{
      alert("Produto não encontrado!")
    }
  
  
  }
}

//Usa a barra de pesquisa ao clicar no botão enter
const input = document.getElementById('pesquisa');
input.addEventListener('keyup', function(e){
  var key = e.which || e.keyCode;
  if (key == 13) {
   procurarProduto(this.value);
  }
});