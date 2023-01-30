
//PORTA DE ENTRADA//
const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");

const { usuarioEntrarSala, mensagemFormatada, getUsuario, usuarioSairSala, getRoomUsers } = require('./usuario');



//PORTA DE ENTRADA//
const app = express();
const server = http.createServer(app);
const PORT = 4000 || process.env.PORT;
const io = socketIO(server);
const local = "http://localhost:"


app.use(express.static(path.join(__dirname, 'src/public')));


// QUANDO O CLIENTE TIVER CONECTADO //
io.on("connection", socket => {
    console.log("Novo usuario conectado!");

    socket.on('entrarSala', ({usuarionome, meuid, sala}) => {
        const usuario = usuarioEntrarSala(socket.id, usuarionome, sala, meuid);
        socket.join(usuario.sala);
        socket.broadcast.to(sala).emit('novaMensagem', mensagemFormatada(usuario.nome));

        io.to(usuario.sala).emit("salaUsuarios", {sala: usuario.sala, usuarios: getRoomUsers(usuario.sala),});
    });

    socket.on('mensagemChat', mensagem => {
        const usuario = getUsuario(socket.id);
        io.to(usuario.sala).emit('novaMensagem', mensagemFormatada(usuario.nome, mensagem, usuario.meuid));
    });

    socket.on('sairSala', () => {
        const usuario = usuarioSairSala(socket.id);
        if (usuario) {
            io.to(usuario.sala).emit('novaMensagem', mensagemFormatada(usuario.nome, 'saiu da sala', usuario.id));

            io.to(usuario.sala).emit('salaUsuarios', {sala: usuario.sala, usuarios: getRoomUsers(usuario.sala), });
        }
    });
});

server.listen(PORT, () => console.log(`servidor online aqui: ${local}${PORT}`));
