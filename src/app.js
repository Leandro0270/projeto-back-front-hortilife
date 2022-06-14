const express = require("express");
const app = express();
const router = express.Router();
const dbo = require("./db/config");
const index = require("./routes/index");
const productRoute = require("./routes/productRoute");

// Conecta no banco de dados MongoDB
dbo.connectToServer();

// Transforma o BODY da requisição em um JSON
app.use(express.json());

// Registra as Rotas
// app.use("/", index);
app.use("/produtos", productRoute);

module.exports = app;
