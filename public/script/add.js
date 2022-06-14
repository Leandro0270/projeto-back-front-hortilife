//Desenvolvido por: Patricia Sycko (42126460) e Leandro Silva (42127882)




const URL = "http://localhost:3000/produtos"
editId = localStorage.getItem("editId");
var IdUrl = `${URL}` + "/" + `${editId}`

//Chama a função que verifica o valor do Localhost
checarEdit()

//Verifica se o localStorage tem algum valor, e se tiver adiciona no valor dos inputs para fazer a alteração
async function checarEdit(){
  if(!editId == ""){
  const resp = await fetch(IdUrl);
  const json = await resp.json();
  
    document.querySelector("#produto").value = json.nome;
    document.querySelector("#preco").value = json.preco
    document.querySelector("#validade").value = json.validade
    document.querySelector("#fornecedor").value = json.fornecedor
    document.querySelector("#url").value = json.categoria
  }
}
//Reage ao clicar no botão de "Criar" verificando se é um método put ou post
async function enviar(){
  event.preventDefault()
  if(!editId == ""){
    produto = document.querySelector("#produto").value
    preco = document.querySelector("#preco").value
    validade = document.querySelector("#validade").value
    fornecedor = document.querySelector("#fornecedor").value
    url = document.querySelector("#url").value
   

    const resp = await fetch(IdUrl, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
        body: JSON.stringify({nome: produto, 
                              validade: validade,
                              preco: preco,  
                              categoria: url, 
                              fornecedor: fornecedor})
    })
    localStorage.clear()
    const conteudo = await resp.json();
    if(!resp.ok){
      alert("Informações incorretas!")
    }
    else{
      alert("Informações corretas, produto registrado!")
      localStorage.clear()
    }
}
  else{
    criarProduto()
  }
    
  }

//Realiza um post ao ser chamado
async function criarProduto(){
    produto = document.querySelector("#produto").value
    preco = document.querySelector("#preco").value
    validade = document.querySelector("#validade").value
    fornecedor = document.querySelector("#fornecedor").value
    url = document.querySelector("#url").value

    const resp = await fetch(URL, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
        body: JSON.stringify({nome: produto, 
                              validade: validade,
                              preco: preco,  
                              categoria: url, 
                              fornecedor: fornecedor})
    })
    const conteudo = await resp.json();
    if(!resp.ok){
      alert("Informações incorretas!")
    }
    else{
      alert("Informações corretas, produto registrado!")
      localStorage.clear()
    }
}