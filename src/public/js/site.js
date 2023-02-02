const inputTexto = document.getElementById('enviarMensagem');   
const socket = io();                                            

const getLocalStorage = () =>JSON.parse(localStorage.getItem('usuario')) ?? [];           
const { usuarionome, meuid, sala } = Qs.parse(location.search, { ignoreQueryPrefix: true });    

const data = JSON.parse(localStorage.getItem('usuario'));
console.log(usuarionome, meuid, sala)
/* -------------------------------- SAIR DA SALA -------------------------------------------- */

const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

/* DEFININDO VARIAVEIS */ 
const btnSair = document.getElementById('btnSair'); 

/* FUNÇÕES */
function saidoJogo(){
    const sairSala = confirm('Certeza que deseja sair da sala?');   
    if (sairSala) {                                                 
        socket.emit('sairSala');                                   
        window.location.href='index.html';                         
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

// Get room and users
socket.on('salaUsuarios', ({ sala, usuarios }) => {
    outputRoomName(sala);
    outputUsers(usuarios);

    listaJogadores = usuarios;
});

// Add room name to DOM
function outputRoomName(sala) {
    roomName.innerText = sala;
  }
  
  // Add users to DOM
  function outputUsers(usuarios) {
    userList.innerHTML = '';
    usuarios.forEach((usuario) => {
      const li = document.createElement('li');
      li.innerText = usuario.nome;
      userList.appendChild(li);
    });
  }

/* ADICIONA A MSG APERTANDO ENTER */
inputTexto.addEventListener('keyup', function(e){   
    var key = e.key === 'Enter';                    
    if(key && this.value){                          
        socket.emit('mensagemChat', this.value);    
        this.value = '';
}});

/* FUNÇAO DE ADICIONAR NOVA MENSAGEM */
function adicionarNovaMensagem(mensagem) {                          
    const usuarioStorage = getLocalStorage();                       
    let minhaMensagem = false;                                      
    if(mensagem.meuid) {                                            
        minhaMensagem = mensagem.meuid === usuarioStorage.meuId;    
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

/* --------------------------- Rounds --------------------------- */


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
var containerjogadores = document.querySelector(".chat-container");

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
var containerCarta1 = document.querySelector(".carta1");
var containerCarta2 = document.querySelector(".carta2");
const cartas = ["bobo", "conselheiro", "eremita", "cavalheiro", "duque", "escriba", "monarca"]
const cartasUrl = ["../Imagens/Boba2.png", "../Imagens/Conselheiro.png", "../Imagens/Eremita.png", "../Imagens/Cavaleiro.png", "../Imagens/Duque.png", "../Imagens/Escriba2.png", "../Imagens/Monarca.png"]

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
    // Embaralhar as cartas e retiralas do deck.
    const posicao1 = (Math.floor(Math.random() * (cartas.length)));
    const posicao2 = (Math.floor(Math.random() * (cartas.length)));

    const primeiracarta = cartas[posicao1];
    const urlPrimeiraCarta = cartasUrl[posicao1];

    const segundacarta = cartas[posicao2];
    const urlSegundaCarta = cartasUrl[posicao2];
    
    pcarta.innerHTML = primeiracarta;
    scarta.innerHTML = segundacarta;
    const usuarioStorage = data;
    if(usuarioStorage.meuId){
        usuarioStorage.minhaMao.push(primeiracarta);
        usuarioStorage.minhaMao.push(segundacarta);
        console.log(usuarioStorage)
    }

    containerCarta1.style.backgroundImage = "url(" + urlPrimeiraCarta + ")";
    containerCarta2.style.backgroundImage = "url(" + urlSegundaCarta + ")";

    socket.emit('ready', {});
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
        if(usuarioStorage.cartas <= 0 || usuarioStorage.cartas > 2){
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
