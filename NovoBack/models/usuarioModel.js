const db = require('../Config/database.js');
const bcrypt = require('bcrypt');

const Usuario = {
  criar: async (nome, email, senha) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);
    try {
      const [result] = await db.execute('INSERT INTO usuarios (NOME, EMAIL, SENHA) VALUES (?, ?, ?)', [nome, email, hashedPassword]);
      return result.insertId;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Email já cadastrado.');
      }
      throw error;
    }
  },

  obterPorEmail: async (email) => {
    const [rows] = await db.execute('SELECT * FROM usuarios WHERE EMAIL = ?', [email]);
    return rows[0];
  },

  obterPorId: async (id) => {
    const [rows] = await db.execute('SELECT CD_USUARIO FROM usuarios WHERE CD_USUARIO = ?', [id]);
    return rows[0];
  },

  excluir: async (id) => {
    const [result] = await db.execute('DELETE FROM usuarios WHERE CD_USUARIO = ?', [id]);
    return result.affectedRows;
  },

  obterTodos: async () => {     
    const [rows] = await db.execute('SELECT CD_USUARIO, NOME, EMAIL FROM usuarios');     
    return rows; },
};

module.exports = Usuario;