//PORTA DE ENTRADA//
const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");

const { usuarioEntrarSala, mensagemFormatada, getUsuario, usuarioSairSala, getRoomUsers, setReady } = require('./usuario');

//PORTA DE ENTRADA//
const app = express();
const server = http.createServer(app);
const PORT = 4000 || process.env.PORT;
const io = socketIO(server);
const local = "http://localhost:"

app.use(express.static(path.join(__dirname, 'src/public')));

// Variaveis referentes ao jogo.
const state = {
    WAITING_PLAYERS: -1,
    WAITING_READY_UP: 1,
    PLAYING: 2 
};

const games = { };

const ctx_template = {
    estado: state.WAITING_PLAYERS,
    quantidade: 0,
    quantidade_prontos: 0,
    tick: 0
};  

// QUANDO O CLIENTE TIVER CONECTADO //
io.on("connection", socket => {
    console.log("Novo usuario conectado!");
    socket.on('entrarSala', ({usuarionome, meuid, sala}) => {
        const usuario = usuarioEntrarSala(socket.id, usuarionome, sala, meuid);

        // Caso um jogo nessa sala nao exista, crie um.
        if (!games[usuario.sala]) {
            games[usuario.sala] = Object.assign({
                id: usuario.sala
            }, ctx_template);

            games[usuario.sala].loopDoJogo = setInterval(gameLoop.bind(null, games[usuario.sala]));

            console.log(`Novo contexto de jogo criado para sala '${usuario.sala}'`);
        }

        const game = games[usuario.sala];

        game.quantidade++;

        if (game.quantidade >= 2 && game.estado === state.WAITING_PLAYERS) {
            game.estado = state.WAITING_READY_UP;
            console.log(`Quantidade minima de jogadores atingida na sala '${usuario.sala}'`);
        }

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
        const game = games[usuario.sala];

        if (game) {
            game.quantidade--;

            if(game.quantidade <= 0) {
                console.log(`Nenhum jogador restante na sala '${usuario.sala}'`);
                delete games[usuario.sala];
            }
        }

        if (usuario) {
            io.to(usuario.sala).emit('novaMensagem', mensagemFormatada(usuario.nome, 'saiu da sala', usuario.id));

            io.to(usuario.sala).emit('salaUsuarios', {sala: usuario.sala, usuarios: getRoomUsers(usuario.sala), });
        }

    });

    // Responsavel por determinar se um jogador esta pronto para jogar ou nao.
    socket.on('ready', () => {
        const idUsuario = socket.id;
        const usuario = getUsuario(socket.id);

        if (!usuario)
            return;

        const game = games[usuario.sala];

        if (game) {
            game.quantidade_prontos++;

            if (game.quantidade_prontos >= 2 && game.estado == state.WAITING_READY_UP) {
                game.estado = state.PLAYING;
            }
        
            console.log(`A sala esta pronta para o jogo ${game.id}`);
        }

        console.log(`Novo jogador esta pronto (${socket.id})`);

        setReady(idUsuario, true);
    });
});

// Loop do jogo.
function gameLoop(ctx) {
    ctx.tick++;

    // Caso nao tenha nenhum jogador online, esperamos os jogadores
    // conectarem.
    if (ctx.estado == state.WAITING_PLAYERS) {
        return;
    }

    // Fique emitindo mensagens de aguardando jogadores (teste de sinal de vida).
    else if(ctx.estado == state.WAITING_READY_UP && ctx.tick % 8 == 0) {
        io.to(ctx.id)
            .emit('novaMensagem', mensagemFormatada('Servidor', 'Aguardando jogadores.', 'admin'));
    }

    // Jogo pronto para jogar!!
    else {
        io.to(ctx.id)
            .emit('novaMensagem', mensagemFormatada('Servidor', 'Jogando!', 'admin'));
    }
}

server.listen(PORT, () => console.log(`servidor online aqui: ${local}${PORT}`));
