const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Adicionado

const db = require('./db');

const app = express();
const port = 3871;

app.use(bodyParser.json());

// Configurar o middleware CORS
app.use(cors());  // Adicionado

// Rota para obter todos os clientes
app.get('/api/clientes', async (req, res) => {
  try {
    const clientes = await db.todosClientes();
    res.json(clientes);
    console.log(res)
  } catch (error) {
    console.error('Erro ao obter todos os clientes', error);
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const clientes = await db.todosClientes();
    const userExists = clientes.some((clientes) => clientes.n_usuario === username && clientes.n_senha === password);

    if (userExists) {
      res.json({ success: true, message: 'Login bem-sucedido' });
    } else {
      res.status(401).json({ success: false, message: 'Credenciais inválidas' });
    }
  } catch (error) {
    console.error('Erro ao verificar as credenciais', error);
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  }
});

app.listen(port, async () => {
  console.log(`Servidor rodando em http://localhost:${port}`);

  try {
    // Obtém e exibe todos os clientes quando o servidor é iniciado
    const clientes = await db.todosClientes();
    // console.log('Todos os clientes:', clientes);
  } catch (error) {
    console.error('Erro ao obter todos os clientes durante a inicialização', error);
  }
});