const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');

const app = express();
const db = new Database('database.db');
const PORT = process.env.PORT || 3001;

// Prepare database and seed default user
db.prepare(
  'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL)'
).run();

const existingUser = db.prepare('SELECT 1 FROM users WHERE email = ?').get('teste@example.com');
if (!existingUser) {
  db.prepare('INSERT INTO users (email, password) VALUES (?, ?)').run('teste@example.com', '123456');
}

app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'E-mail e senha são obrigatórios' });
  }

  const user = db.prepare('SELECT email, password FROM users WHERE email = ?').get(email);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  return res.status(200).json({ message: 'Login efetuado com sucesso!' });
});

app.listen(PORT, () => {
  console.log(`Backend ouvindo na porta ${PORT}`);
});
