const express = require('express');
const bodyParser = require('body-parser');
const usuarioController = require('./Controllers/usuarioController.js');
const { ChecarToken } = require('./middleware/VerificarToken');
const Usuario = require('./models/usuarioModel.js');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// Criar
app.post('/usuarios', usuarioController.criarUsuario);

// Excluir
app.delete('/usuarios/:id', ChecarToken, usuarioController.excluirUsuario);

// ROTA DE LOGIN
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  try {
    const usuario = await Usuario.obterPorEmail(email);
    if (!usuario) {
      return res.status(401).json({ message: 'Email ou senha incorretos.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.SENHA);
    if (!senhaValida) {
      return res.status(401).json({ message: 'Email ou senha incorretos.' });
    }

    return res.status(200).json({ message: 'Login realizado com sucesso!', usuario: { nome: usuario.NOME, id: usuario.CD_USUARIO } });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

app.post('/alterar-dados', (req, res) => {
  if (!req.session.usuario) {
    return res.status(401).send('Usuário não autenticado');
  }

  console.log(`Usuário ${req.session.usuario.nome} tentou alterar os dados`);
  res.send('Dados alterados com sucesso');
});



async function criarUsuarioInicial() {
  try {
    const usuarioExistente = await Usuario.obterPorEmail('teste@gmail.com');
    if (!usuarioExistente) {
      const nome = 'teste';
      const email = 'teste@gmail.com';
      const senha = 'teste';
      const salt = await bcrypt.genSalt(10);
      // const hashedPassword = await bcrypt.hash(senha, salt);
      // const usuarioId = await Usuario.criar(nome, email, hashedPassword);
      const usuarioId = await Usuario.criar(nome, email, senha);
      console.log(`Usuário inicial 'teste' criado com ID: ${usuarioId}`);
    } else {
      console.log('Usuário inicial \'teste\' já existe.');
    }
  } catch (error) {
    console.error('Erro ao criar usuário inicial:', error);
  }
}

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  criarUsuarioInicial(); 
});