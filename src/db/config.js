const { MongoClient } = require("mongodb");
const connectionString = "Seu link do mongo!"
;

const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function () {
    client.connect(function (err, db) {
      if (err || !db) {
        console.error("Erro ao tentar conectar no MongoDB.");
        console.error(err);
      } else {
        dbConnection = db.db("hortifruti");
        console.log("Sucesso ao conectar no MongoDB.");
      }
    });
  },

  getDb: function () {
    return dbConnection;
  },
};