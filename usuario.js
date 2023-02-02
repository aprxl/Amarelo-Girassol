const usuarios = [];
const moment = require('moment');  /* USA PRA ENVIAR MENSAGEM */
moment.locale('pt-br');

function usuarioEntrarSala(id, nome, sala, meuid) {
    const usuario = {id, nome, sala, meuid, pronto: false};
    usuarios.push(usuario);
    return usuario;
} /* OK */

function usuarioSairSala(id) {
    const index = usuarios.findIndex(usuario => usuario.id === id);
    if (index !== -1){
        return usuarios.splice(index, 1)[0];
    }
} /* OK */

function mensagemFormatada(usuarioNome, mensagemParam, meuid) {
    var mensagem = mensagemParam ? mensagemParam : "Oi, acabei de entrar no jogo";
    return {
        usuarioNome,
        mensagem,
        horario: moment().format('lll'),
        meuid
    };
} /* OK */


function getUsuario(idUsuario) {
    return usuarios.find(usuario => usuario.id === idUsuario);
}

function getRoomUsers(sala){
    return usuarios.filter(usuario => usuario.sala === sala);
}

function setReady(idUsuario, state) {
    const user = usuarios.find(u => u.id === idUsuario);
    if (!user)
        return;

    user.pronto = state;
}

function formatMessage(username, text) {
    return {
      username,
      text,
      time: moment().format('h:mm a')
    };
  }

module.exports = {
    usuarioEntrarSala,
    mensagemFormatada,
    getUsuario,
    usuarioSairSala, 
    getRoomUsers,
    setReady
};