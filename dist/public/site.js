"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inputTexto = document.getElementById('enviarMensagem');
const getLocalStorage = () => JSON.parse(localStorage.getItem('usuario')) ?? [];
const socket = io();
const { usuarionome, meuid } = QS.parse(location.search, { ignoreQueryPrefix: true });
socket.emit("entrarSala", { usuarionome, meuid });
//------------- COLOCANDO A MSG NO CHAT -------------// 
inputTexto.addEventListener("keyup", function (e) {
    var key = e.key === 'Enter';
    if (key && this.value) {
        adicionarNovaMensagem(this.value);
        this.value = '';
    }
});
//---------------- COLOCANDO NO HTML ----------------// 
function criarElementoHtml(nomeElemento, classeElemento) {
    var elemento = document.createElement(nomeElemento);
    for (var classe of classeElemento) {
        elemento.classList.add(classe);
    }
    return elemento;
}
//----------------- SCROLL DO CHAT -----------------//
function realizarScrollChat() {
    var elemento = document.getElementById('chat');
    elemento.scrollTop = elemento.scrollHeight;
}
//-------------- SEPARANDO A MENSAGEM --------------//
function adicionarNovaMensagem(mensagem) {
    var quadroMensagens = document.getElementById('quadro-mensagens');
    var li = criarElementoHtml('li', ['clearfix']);
    var span = criarElementoHtml('span', ['message-data-time']);
    var divMensagem = criarElementoHtml('div', ['message', 'my-message']);
    var divDetalhes = criarElementoHtml('div', ['message-data']);
    span.innerHTML = 'Nome Teste, 12 Dec 2022 - 21:15';
    divMensagem.innerHTML = mensagem;
    divDetalhes.appendChild(span);
    li.appendChild(divDetalhes);
    li.appendChild(divMensagem);
    quadroMensagens.appendChild(li);
    realizarScrollChat();
}
//# sourceMappingURL=site.js.map