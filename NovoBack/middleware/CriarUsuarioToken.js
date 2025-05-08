const jwt = require('jsonwebtoken');

const CriarUsuarioToken = async (usuario, req, res) => {
    const token = jwt.sign({
        id: usuario.CD_USUARIO,
        nivelAcesso: usuario.NIVEL_ACESSO,
    }, "nossosecret", { expiresIn: '7h' });

    res.status(200).json({
        message: 'Você está autenticado!',
        token: token,
        usuarioId: usuario.CD_USUARIO,
        nivelAcesso: usuario.NIVEL_ACESSO
    });
};

module.exports = CriarUsuarioToken;S