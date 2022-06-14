const repo = require("../repositories/productRepository");

// O que fazer neste arquivo
//
// Aqui você escreve as funções que serão usadas no mapeamento das rotas
// escreva as lógicas de validação de dados e de transformação, se necessário
// por exemplo, como usamos MongoDB no repositório, o ID vem com um underline "_"
// no começo "_id", se quiser mudar isso, pode mudar aqui ou no repositório, ai
// vai depender da estratégia que a equipe quer adotar.
//
//
// O que não fazer neste arquivo
//
// Não escreva lógica do banco de dados, isso vai no repositório
// Não faça mapeamento de subrotas e, por se tratar de uma API restful devolva
// dados no formato JSON. Outros formatos tome cuidado se são válidos para o
// tipo de requisição. 
//

////////////////////////////////////
// MIDDLEWAREs de validação
////////////////////////////////////
exports.validarProduto = (req, res, next) => {
  const {nome, validade, preco, fornecedor, categoria} = req.body;

  if(!nome        || nome.trim()   === "" ||
     !validade    || validade.trim()  === "" ||
     !fornecedor  || fornecedor.trim() ===""||
     !categoria   || categoria.trim() ===""||
     !preco       || preco.trim() === "" ) {
    res.status(400).send({error: 400, message: "Dados inválidos. É necessário o preenchimento de todos os dados"});
    return;
  }

  next();
}

exports.validarId = (req, res, next) => {
  const id = req.params.id;
  if(repo.validarId(id)) {
    next();
  } else {
    res.status(400).send({error: 400, message: "ID inválido"});
  }
}

////////////////////////////////////
// CREATE
////////////////////////////////////
exports.post = async (req, res) => {
  try {
    const {nome, validade, preco, fornecedor,categoria} = req.body;

    let novoProduto = {
      nome: nome,
      validade: validade,
      preco: preco,
      fornecedor: fornecedor,
      categoria: categoria
    };
  
    novoProduto = await repo.create(novoProduto);
    res.json(novoProduto)
  } catch(err) {
    res.status(400).send("Erro ao criar novo produto");
    console.log(err);
  }
}

////////////////////////////////////
// READ
////////////////////////////////////
exports.getById = async (req, res) => {
  const id = req.params.id;

  try {
    const produto = await repo.findById(id);
    if(produto)
      res.json(produto);
    else
      res.status(404).send({error: 404, message: "Produto não encontrado"})
  } catch(err) {
    res.status(400).send({error: 400, message: `Erro ao buscar produto pelo id ${id}`});
    console.error(err);
  }
}

exports.get = async (req, res) => {
  try {
    const produtos = await repo.findAll();
    res.json(produtos);
  } catch(err) {
    console.error(err);
    res.status(400).send({error: 400, message: "Erro ao buscar produtos"});
  }
}

////////////////////////////////////
// UPDATE
////////////////////////////////////
exports.put = async (req, res) => {
  const id = req.params.id;
  const {nome, validade, preco, fornecedor, categoria} = req.body;

  let produto = {
      nome: nome,
      validade: validade,
      preco: preco,
      fornecedor: fornecedor,
      categoria: categoria
    };
  
  try {
    produto = await repo.update(id, produto);
    if(produto)
      res.json(produto);
    else
      res.status(404).send({error: 404, message: "Produto não encontrado"})
    
  } catch (err) {
    console.error(err);
    res.status(400).send({error: 400, message: `Erro ao atualizar dados do produto pelo id ${id}!`});
  }
}


////////////////////////////////////
// DELETE
////////////////////////////////////
exports.delete = async (req, res) => {
  const id = req.params.id;
  
  try {
    const produto = await repo.delete(id);
    if(produto)
      res.json(produto);
    else
      res.status(404).send({error: 404, message: "Produto não encontrado"})
  } catch (err) {
    res.status(400).send({error: 400, message: `Erro ao apagar produto pelo id ${id}`});
    console.error(err);
  }
}
