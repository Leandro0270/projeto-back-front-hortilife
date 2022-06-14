const dbo = require("../db/config");
const { ObjectId } = require("mongodb");

// O que colocar neste arquivo
//
// Este arquivo contém toda a lógica de acesso/consulta ao banco de dados
// é um bom método para separar os detalhes de implementação do banco de
// todo o resto da aplicação back-end. No caso, se desejar mudar para um
// banco de dados relacional, basta mudar neste arquivo e/ou criar um novo
// repositório com os mesmos métodos e tipos de retorno.
//

////////////////////////////////////
// Métodos utilitários
////////////////////////////////////
exports.validarId = (id) => {
  return ObjectId.isValid(id);
}

////////////////////////////////////
// CREATE
////////////////////////////////////
exports.create = async (produto) => {
  const dbConnect = dbo.getDb();
  
  const produtoInserido = await dbConnect
    .collection("produtos")
    .insertOne(produto);

  return await this.findById(produtoInserido.insertedId)
}


////////////////////////////////////
// READ
////////////////////////////////////
exports.findAll = async () => {
  const dbConnect = dbo.getDb();

  const dados = await dbConnect
    .collection("produtos")
    .find({}).limit(50) // limite de 50 registros no máximo
  return await dados.toArray();
}

exports.findById = async (id) => {
  const consulta = { _id: new ObjectId(id)};
  const dbConnect = dbo.getDb();

  return await dbConnect
    .collection("produtos")
    .findOne(consulta);
}


////////////////////////////////////
// UPDATE
////////////////////////////////////
exports.update = async (id, produto) => {
  const produtoQuery = { _id: new ObjectId(id) };
  const dbConnect = dbo.getDb();

  const result = await dbConnect
    .collection("produtos")
    .findOneAndUpdate(produtoQuery, { $set: produto}, {upsert: true}); // upsert insere se não existir 
                                                                   // documento com a mesma chave
  return result.value;
}


////////////////////////////////////
// DELETE
////////////////////////////////////
exports.delete = async (id) => {
  const consulta = { _id: new ObjectId(id)};
  const dbConnect = dbo.getDb();

  const produto = await this.findById(id);

  await dbConnect
    .collection("produtos")
    .deleteOne(consulta);

  return produto;
}