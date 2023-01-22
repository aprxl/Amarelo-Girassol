const inputTexto = document.getElementById('enviarMensagem');
const btnSair = document.getElementById('btnSair');
const socket = io(); 

const getLocalStorage = () =>JSON.parse(localStorage.getItem('usuario')) ?? []; /* ta passando pra um array */
const { usuarionome, meuid } = Qs.parse(location.search, { ignoreQueryPrefix: true });

/* INFORMA QUE O USUARIO ENTROU NA SALA */
socket.emit('entrarSala', { usuarionome, meuid});

/* ADICIONA A MSG APERTANDO ENTER */
inputTexto.addEventListener('keyup', function(e){   /* se apertar a tecla:                  */
    var key = e.key === 'Enter';                    /* definindo o botao (enter)            */
    if(key && this.value){                          /* se a tecla pressionada for a enter   */
        socket.emit('mensagemChat', this.value);    /* emitir o que tava escrito            */
        this.value = '';
}});

/* USUARIO SAIU DA SALA */  
btnSair.addEventListener('click', function(){                       /* se clicar fazer a função                 */
    const sairSala = confirm('Certeza que deseja sair da sala?');   /* perguntar se tem certeza se quer sair    */
    if (sairSala) {                                                 /* se clicar em sair                        */
        socket.emit('sairSala');                                    /* se ele confirmar que quer sair da sala:  */
        window.location.href='index.html';                          /* mandando o usuario ir pro index.html     */
}});


/* FUNÇAO DE ADICIONAR NOVA MENSAGEM */
function adicionarNovaMensagem(mensagem) {                          /* recebe como parametro a mensagem                  */
    const usuarioStorage = getLocalStorage();                       /* definir o json do usuario como uma variavel       */
    let minhaMensagem = false;                                      /* definir a variavel minhaMensagem como false       */
    if(mensagem.meuid) {                                            /* pegar a mensagem pelo meu id                      */
        minhaMensagem = mensagem.meuid === usuarioStorage.meuId;    /* define minha mensagem tendo o mesmo id do usuario */
    }

    var divMensagem = '';
    var divDetalhes = '';
    var quadroMensagens = document.getElementById('quadro-mensagens');
    var li = criarElementoHtml('li', ['clearfix']);
    var span = criarElementoHtml('span', ['message-data-time']);

    if(minhaMensagem) {
        divMensagem = criarElementoHtml('div', ['message', 'other-message', 'float-right' ]);
        divDetalhes = criarElementoHtml('div', ['message-data', 'text-right']);
    } else {
        divMensagem = criarElementoHtml('div', ['message', 'my-message']);
        divDetalhes = criarElementoHtml('div', ['message-data']);
    }

    span.innerHTML = (minhaMensagem ? "eu" : mensagem.usuarioNome) + ', ' + mensagem.horario;
    divMensagem.innerHTML = mensagem.mensagem;
    divDetalhes.appendChild(span);
    li.appendChild(divDetalhes);
    li.appendChild(divMensagem);
    quadroMensagens.appendChild(li);
    realizarScrollChat();
}

function criarElementoHtml(nomeElemento, classeElemento, atributosElemento) {
    var elemento = document.createElement(nomeElemento);
    for (var classe of classeElemento) {
        elemento.classList.add(classe);
    }
    return elemento;
}

function realizarScrollChat() {
    var elem = document.getElementById('chat');
    elem.scrollTop = elem.scrollHeight;
}

socket.on('salaUsuarios', ({sala, usuarios}) => {
    document.getElementById("salaId").innerHTML = sala;
    document.getElementById("listaUsuarios").innerHTML = '';
    for (var usuario of usuarios) {
        criarListaUsuarios(usuario.nome);
    }
});

socket.on('novaMensagem', (mensagem) => {
    adicionarNovaMensagem(mensagem);
});

/* ADICIONAR ESSA FUNÇAO NO HTML */
function criarListaUsuarios(usuarioNome) {
    var listaUsuarios = document.getElementById("listaUsuarios");
    var liUsuario = criarElementoHtml("li", ["clearfix"]);
    var divDescricaoUsuario = criarElementoHtml('div', ["about"]);
    var divNomeUsuario = criarElementoHtml('div', ["name"]);
    var divStatusUsuario = criarElementoHtml('div', ["status"]);
    var iconeStatus = criarElementoHtml("i" , ["fa", "fa-circle", "online"]);

    iconeStatus.innerHTML = "online";
    divNomeUsuario.innerHTML = usuarioNome;
    divStatusUsuario.appendChild(iconeStatus);
    divDescricaoUsuario.appendChild(divNomeUsuario);
    divDescricaoUsuario.appendChild(divStatusUsuario);
    liUsuario.appendChild(divDescricaoUsuario);
    listaUsuarios.appendChild(liUsuario);
}