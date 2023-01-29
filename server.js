
//PORTA DE ENTRADA//
const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");

const { usuarioEntrarSala, getUsuariosSala, mensagemFormatada, getUsuario, usuarioSairSala } = require('./usuario');



//PORTA DE ENTRADA//
const app = express();
const server = http.createServer(app);
const PORT = 4000 || process.env.PORT;
const io = socketIO(server);
const local = "http://localhost:"


app.use(express.static(path.join(__dirname, 'src/public')));

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM();
global.document = dom.window.document;
var room = document.getElementById('room');


const nomeSala = room;

// QUANDO O CLIENTE TIVER CONECTADO //
io.on("connection", socket => {
    console.log("Novo usuario conectado!");

    socket.on('entrarSala', ({usuarionome, meuid}) => {
        const usuario = usuarioEntrarSala(socket.id, usuarionome, nomeSala, meuid);
        socket.join(nomeSala);

        socket.broadcast.to(nomeSala).emit('novaMensagem', mensagemFormatada(usuario.nome));
        io.to(usuario.sala).emit("salaUsuarios", {sala: usuario.sala, usuarios: getUsuariosSala()});
    });

    socket.on('mensagemChat', mensagem => {
        const usuario = getUsuario(socket.id);
        io.to(nomeSala).emit('novaMensagem', mensagemFormatada(usuario.nome, mensagem, usuario.meuid));
    });

    /* iniciar o jogo /

    / se clicar no escriba */

    socket.on('sairSala', () => {
        const usuario = usuarioSairSala(socket.id);
        if (usuario) {
            io.to(nomeSala).emit('novaMensagem', mensagemFormatada(usuario.nome, 'saiu da sala', usuario.id));
            io.to(nomeSala).emit('salaUsuarios', {sala: usuario.sala, usuarios: getUsuariosSala() });
        }
    });
});

server.listen(PORT, () => console.log(`servidor online aqui: ${local}${PORT}`));
