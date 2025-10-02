const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./banco.db");

// Criar tabela se não existir
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT
  )`);
});

module.exports = db;
