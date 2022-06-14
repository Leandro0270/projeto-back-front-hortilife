const app = require("./src/app");
const express = require("express")
const port = 3000;

app.listen(port, function() {
  app.use('/', express.static(__dirname +'/public'))
  console.log(`Aplicação ouvindo na porta ${port}`);
});
