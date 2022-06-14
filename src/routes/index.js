const express = require("express");
const router = express.Router();

// Usado para dar uma mensagem amigável para quem abrir a página principal da API
router.get("/", (req, res, next) => {
  res.status(200).send({
    title: "Projeto NodeJS com Banco de Dados",
    version: "0.0.1",
  });
});

module.exports = router;
