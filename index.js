const express = require("express");
const db = require("./db");

const app = express();
const PORT = 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Array de produtos fictícios
const produtos = [
  { id: 1, nome: "Notebook", preco: 3500 },
  { id: 2, nome: "Celular", preco: 2000 },
  { id: 3, nome: "Fone Bluetooth", preco: 250 }
];

// Rota inicial
app.get("/", (req, res) => {
  res.send("Servidor rodando! ");
});

// Rota de produtos
app.get("/produtos", (req, res) => {
  res.json(produtos);
});

// Rota de cadastro banco SQLite
app.post("/cadastro", (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ erro: "Nome e email são obrigatórios!" });
  }

  db.run("INSERT INTO usuarios (nome, email) VALUES (?, ?)", [nome, email], function(err) {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }
    res.json({ mensagem: "Usuário cadastrado com sucesso!", id: this.lastID });
  });
});

// Rota para listar usuários cadastrados
app.get("/usuarios", (req, res) => {
  db.all("SELECT * FROM usuarios", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
