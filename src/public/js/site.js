const inputTexto = document.getElementById('enviarMensagem');   /* pega o id do input no chat.html           */
const socket = io();                                            /* define a variavel socket como a função io */

const getLocalStorage = () =>JSON.parse(localStorage.getItem('usuario')) ?? [];           /* ta pegando os usuarios do index.js e passando eles para array */
const { usuarionome, meuid, sala } = Qs.parse(location.search, { ignoreQueryPrefix: true });    /* definindo variaveis com uns bgl esquisito                     */

const data = JSON.parse(localStorage.getItem('usuario'));
console.log(usuarionome, meuid, sala)
/* -------------------------------- SAIR DA SALA -------------------------------------------- */

/* DEFININDO VARIAVEIS */ 
const btnSair = document.getElementById('btnSair'); 

/* FUNÇÕES */
function saidoJogo(){
    const sairSala = confirm('Certeza que deseja sair da sala?');   /* perguntar se tem certeza se quer sair    */
    if (sairSala) {                                                 /* se clicar em sair                        */
        socket.emit('sairSala');                                    /* se ele confirmar que quer sair da sala:  */
        window.location.href='index.html';                          /* mandando o usuario ir pro index.html     */
}}
function instasair(){                                          
    socket.emit('sairSala');                                    
    window.location.href='index.html';
}

/* BOTÃO */
btnSair.addEventListener('click', saidoJogo);


/* ----------------------------------- CHAT--------------------------------------------------- */

/* INFORMA QUE O USUARIO ENTROU NA SALA */
socket.emit('entrarSala', { usuarionome, meuid, sala});

/* ADICIONA A MSG APERTANDO ENTER */
inputTexto.addEventListener('keyup', function(e){   /* se apertar a tecla:                  */
    var key = e.key === 'Enter';                    /* definindo o botao (enter)            */
    if(key && this.value){                          /* se a tecla pressionada for a enter   */
        socket.emit('mensagemChat', this.value);    /* emitir o que tava escrito            */
        this.value = '';
}});

/* FUNÇAO DE ADICIONAR NOVA MENSAGEM */
function adicionarNovaMensagem(mensagem) {                          /* recebe como parametro a mensagem                  */
    const usuarioStorage = getLocalStorage();                       /* definir o json do usuario como uma variavel       */
    let minhaMensagem = false;                                      /* definir a variavel minhaMensagem como false       */
    if(mensagem.meuid) {                                            /* pegar a mensagem pelo meu id                      */
        minhaMensagem = mensagem.meuid === usuarioStorage.meuId;    /* define minha mensagem tendo o mesmo id do usuario */
    }

    /* ---------------- DEFININDO VARIAVEIS ------------------ */
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
    
    /* ---------- TRANSFORMANDO EM DIVS PRO HTML ------------- */
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


/* ---------------------- LISTA DE USUARIOS -------------------------------- */
function criarListaUsuarios(usuarioNome) {

    /* ---------- DEFININDO VARIAVEIS ----------------- */
    var listaUsuarios = document.getElementById("listaUsuarios");
    var liUsuario = criarElementoHtml("li", ["clearfix"]);
    var divDescricaoUsuario = criarElementoHtml('div', ["about"]);
    var divNomeUsuario = criarElementoHtml('div', ["name"]);
    var divStatusUsuario = criarElementoHtml('div', ["status"]);
    var iconeStatus = criarElementoHtml("i" , ["fa", "fa-circle", "online"]);

    /* ----------- CRIANDO DIVS PRO HTML -------------- */
    iconeStatus.innerHTML = "online";
    divNomeUsuario.innerHTML = usuarioNome;
    divStatusUsuario.appendChild(iconeStatus);
    divDescricaoUsuario.appendChild(divNomeUsuario);
    divDescricaoUsuario.appendChild(divStatusUsuario);
    liUsuario.appendChild(divDescricaoUsuario);
    listaUsuarios.appendChild(liUsuario);
}


/* --------------------------- MENU RESPONSIVO --------------------------- */
var ul = document.querySelector('nav ul');
var menuBtn = document.querySelector('.menu-btn i');
function menuShow() {
    if (ul.classList.contains('open')) {
        ul.classList.remove('open');
    }else{
        ul.classList.add('open');
    }
}


/* -------------------------------- BOTOES ------------------------------- */

/* ---------------- BOTAO DE VER O CHAT --------------------- */

/* DEFINDO VARIAVEIS */
var btn = document.getElementById("mostrar");
var container = document.querySelector(".card");

btn.addEventListener("click", function() { 
  if(container.style.display === "block") {
        container.style.display = "none";
    } else {
      container.style.display = "block";
  }   
});
btn.addEventListener("click",function(){
    containerjogadores.style.display = "none";
});

/* ----------- BOTAO DE VER OS JOGADORES NA SALA ------------- */

/* DEFINDO VARIAVEIS */
var btnjogadores = document.getElementById("mostrarjogadores");
var containerjogadores = document.querySelector(".box");

/* FUNÇÕES */
btnjogadores.addEventListener("click", function(){
    if (containerjogadores.style.display === "block"){
        containerjogadores.style.display = "none";
    }else{
        containerjogadores.style.display = "block";
    }
});
btnjogadores.addEventListener("click",function(){
    container.style.display = "none";
});


/* ----------------- EMBARALHAR O JOGO ---------------------- */

/* DEFININDO VARIAVEIS */
var btnembaralhar = document.getElementById("embaralhar");
var containerembaralhar = document.querySelector(".Embaralhar");
const cartas = ["bobo", "conselheiro", "eremita", "cavaleiro", "duque", "escriba", "monarca"];
const primeiracarta = cartas[(Math.floor(Math.random() * (cartas.length)))];
const segundacarta = cartas[(Math.floor(Math.random() * (cartas.length)))];
var pcarta = document.querySelector("#primeiracarta")
var scarta = document.querySelector("#segundacarta")



/* BOTAO EMBARALHAR */
btnembaralhar.addEventListener("click", function(){
    if (containerembaralhar.style.display === "none"){
        containerembaralhar.style.display = "block";
    }else{
        containerembaralhar.style.display = "none";
    }
});

/*-----------------------------MUDAR IMAGEM-------------------------------*/

/*function mudarCarta(nomeCarta){
    const cartas = ["bobo", "conselheiro", "eremita", "cavaleiro", "duque", "escriba", "monarca"];
    const caminhos= ["../Imagens/Boba2.png", "../Imagens/Conselheiro.png", "../Imagens/Eremita.png", "../Imagens/Cavaleiro.png", "../Imagens/Duque.png", "../Imagens/Escriba2.png", "../Imagens/Monarca.png"];

    let idx = cartas.indexOf(nomeCarta);
    if(idx<0){
        return;
    }

    const div = document.querySelector('.carta1');
    div.style.backgroundImage = `url('${caminhos[idx]}')`;

}*/

/* ESCOLHENDO AS CARTAS */
btnembaralhar.addEventListener("click", function(){
    pcarta.innerHTML = primeiracarta;
    scarta.innerHTML = segundacarta;
    const usuarioStorage = data;
    if(usuarioStorage.meuId){
        usuarioStorage.minhaMao.push(primeiracarta);
        usuarioStorage.minhaMao.push(segundacarta);
        console.log(usuarioStorage)
    }
});


/* ------------- REVELANDO AS CARTAS ------------------*/

/* DEFININDO VARIAVEIS */
var containercarta1 = document.querySelector(".carta1");
var containercarta2 = document.querySelector(".carta2");

/* FUNÇÕES */
function carta1aparecer(){
    if (containercarta1.style.display === "block"){
        containercarta1.style.display = "none";
    }else{
        containercarta1.style.display = "block";
    }
}

btnembaralhar.addEventListener("click", carta1aparecer)

btnembaralhar.addEventListener("click", function(){
    if (containercarta2.style.display === "block"){
        containercarta2.style.display = "none";
    }else{
        containercarta2.style.display = "block";
    }
});


/* ------------------------------ PATACAS -------------------------------- */
/* DEFININDO VARIAVEIS */
var patacasb = document.getElementById("patacasbotao");

/* FUNÇÕES */
function adicionarPatacas(){
    const usuarioStorage = data;
    /* pegar o id do carinha */
    if(usuarioStorage.meuId){
        usuarioStorage.patacas = usuarioStorage.patacas+1;
        console.log(usuarioStorage.patacas)
        if(usuarioStorage.patacas == 10){
            alert('Você atingiu o número maximo de patacas, DE UM GOLPE DE ESTADO !')
            tirarPatacas()
        }
    }}

function tirarPatacas(){
    const usuarioStorage = data;
    /* pegar o id do carinha */
    if(usuarioStorage.meuId){
        usuarioStorage.patacas = usuarioStorage.patacas-1;
        console.log(usuarioStorage.patacas)
    }}

/* BOTÃO */
patacasb.addEventListener("click", adicionarPatacas);


/* ------------------------------- CARTAS ------------------------------- */
var excluicarta = document.getElementById('tirarcarta');

function tirarCarta(){
    const usuarioStorage = data;
    /* pegar o id do carinha */
    if(usuarioStorage.meuId){
        usuarioStorage.cartas = usuarioStorage.cartas-1;
        usuarioStorage.minhaMao.shift()
        carta1aparecer();
        console.log(usuarioStorage)
        if(usuarioStorage.cartas == 0 ){
            instasair();
        }
    }}

/* ------------------------------ ANTI-CHEAT ------------------------------ */

setInterval(()=>{
    const usuarioStorage = data;
    if(usuarioStorage.meuId){
        /* não deixa ter mais de 2 cartas ou menos de 0 */
        if(usuarioStorage.cartas <= 0 || usuarioStorage > 2){
            instasair();
            alert("não permitimos cheters nesse jogo !"); 
        }
        /* não deixa que o usuario tenha mais que 10 patacas */
        else if(usuarioStorage.patacas > 10){
            instasair();
            alert("não permitimos cheters nesse jogo !"); 
        }
    }
},10000);

excluicarta.addEventListener("click", tirarCarta);


/* --------------------------- SERVIDOR ---------------------------------- */
setInterval(() => {
    console.log(data);
    socket.on('tudo', data);
}, 5000);

/* DEFIININDO OS USUARIOS NA SALA */
socket.on('salaUsuarios', ({sala, usuarios}) => {
    document.getElementById("salaId").innerHTML = sala;
    document.getElementById("listaUsuarios").innerHTML = '';
    for (var usuario of usuarios) {
        criarListaUsuarios(usuario.nome);
    }
});

/* ADICIONANDO MENSAGEM */
socket.on('novaMensagem', (mensagem) => {
    adicionarNovaMensagem(mensagem);
});
