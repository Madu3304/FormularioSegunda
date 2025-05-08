const Usuario = require('../models/usuarioModel.js');
const CriarUsuarioToken = require('../middleware/CriarUsuarioToken.js');

const usuarioController = {
  async criarUsuario(req, res) {
    const { NOME, EMAIL, SENHA } = req.body;
    if (!NOME || !EMAIL || !SENHA) {
      return res.status(400).json({ message: 'Por favor, forneça nome, email e senha.' });
    }
    try {
      const usuarioId = await Usuario.criar(NOME, EMAIL, SENHA);

      const usuarioCriado = await Usuario.obterPorId(usuarioId);
      if (usuarioCriado) {

        const usuarioParaToken = { CD_USUARIO: usuarioCriado.CD_USUARIO, NIVEL_ACESSO: 1 };
        await CriarUsuarioToken(usuarioParaToken, req, res);
      } else {
        res.status(500).json({ message: 'Erro ao buscar usuário criado.' });
      }
    } catch (error) {
      if (error.message === 'Email já cadastrado.') {
        return res.status(409).json({ message: error.message });
      }
      res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
    }
  },

  async excluirUsuario(req, res) {
    const { id } = req.params;
    try {
      const affectedRows = await Usuario.excluir(id);
      if (affectedRows === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }
      res.status(200).json({ message: 'Usuário excluído com sucesso!' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir usuário', error: error.message });
    }
  },

  async listarUsuarios(req, res) {     
    try {       
      const usuarios = await Usuario.obterTodos();       
      res.status(200).json(usuarios);    
     } catch (error) {       
    res.status(500).json({ message: 'Erro ao listar usuários', error: error.message }); } }
};

module.exports = usuarioController;