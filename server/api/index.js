const express = require('express');
const app = express();
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json({ limit: '10mb' }));

let db = new sqlite3.Database('credentials.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Conectado ao banco de dados');
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
  next();
});

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send({ auth: false, message: 'Token não fornecido.' });
  }

  jwt.verify(token, '15043649', (err, decoded) => {
    if (err) {
      console.log('Erro na verificação do token',err)
      return res.status(401).send({ auth: false, message: 'Falha na autenticação do token.' });
    }

    req.userId = decoded.id;
    next();
  });
};


app.get('/user-info', verifyToken, (req, res) => {
  res.status(200).send({ auth: true, message: 'Informações do usuário obtidas com sucesso.' });
});

app.post('/login', (req, res) => {
  const { nome, senha } = req.body;

  db.all(`SELECT * FROM credentials WHERE nome = '${nome}' AND senha = '${senha}'`, (err, rows) => {
    if (err) {
      console.error(err.message)
      return res.status(500).send({auth:false,message:'Erro ao buscar credenciais'})
    }

    if (rows.length > 0) {
      const token = jwt.sign({ id: rows[0].id }, '15043649', {
        expiresIn: 30,
      });

      res.status(200).send({ auth: true, token });
    } else {
      res.status(401).send({ auth: false, message: 'Credenciais inválidas.' });
    }
  });
});


app.post('/signup', (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  db.run(
    'INSERT INTO credentials (nome, email, senha, confirmar_senha) VALUES (?, ?, ?, ?)',
    [username, email, password, confirmPassword],
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send({ success: false, message: 'Erro ao cadastrar usuário' });
      } else {
        res.status(200).send({ success: true, message: 'Usuário cadastrado com sucesso' });
      }
    }
  );
});

app.listen(3001, () => console.log('Servidor OK!'));
