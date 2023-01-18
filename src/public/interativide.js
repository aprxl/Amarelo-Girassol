/* FUNÇAO DO MENU RESPONSIVO */
var ul = document.querySelector('nav ul');
var menuBtn = document.querySelector('.menu-btn i');
function menuShow() {
    if (ul.classList.contains('open')) {
        ul.classList.remove('open');
    }else{
        ul.classList.add('open');
    }
}

/* BOTAO DE VER O CHAT */
var btn = document.getElementById("mostrar");
var container = document.querySelector(".card");

btn.addEventListener("click", function() { 
  if(container.style.display === "block") {
        container.style.display = "none";
    } else {
      container.style.display = "block";
  }   
});

/* BOTAO DE VER OS JOGADORES NA SALA */
var btnjogadores = document.getElementById("mostrarjogadores");
var containerjogadores = document.querySelector(".box");
btnjogadores.addEventListener("click", function(){
    if (containerjogadores.style.display === "block"){
        containerjogadores.style.display = "none";
    }else{
        containerjogadores.style.display = "block";
    }
});

/* EMBARALHAR O JOGO */
var btnembaralhar = document.getElementById("embaralhar");
var containerembaralhar = document.querySelector(".Embaralhar");

btnembaralhar.addEventListener("click", function(){
    if (containerembaralhar.style.display === "none"){
        containerembaralhar.style.display = "block";
    }else{
        containerembaralhar.style.display = "none";
    }
});

const cartas = [
    "bobo", "conselheiro", "eremita", "cavalheiro", "duque", "escriba", "monarca"
]
const primeiracarta = cartas[(Math.floor(Math.random() * (cartas.length)))];
const segundacarta = cartas[(Math.floor(Math.random() * (cartas.length)))];
var pcarta = document.querySelector("#primeiracarta")
var scarta = document.querySelector("#segundacarta")

/* ESCOLHENDO AS CARTAS */
btnembaralhar.addEventListener("click", function(){
    pcarta.innerHTML = primeiracarta;
    scarta.innerHTML = segundacarta;
});


/* REVELANDO AS CARTAS */
var containercarta1 = document.querySelector(".carta1");
btnembaralhar.addEventListener("click", function(){
    if (containercarta1.style.display === "block"){
        containercarta1.style.display = "none";
    }else{
        containercarta1.style.display = "block";
    }
});

var containercarta2 = document.querySelector(".carta2");
btnembaralhar.addEventListener("click", function(){
    if (containercarta2.style.display === "block"){
        containercarta2.style.display = "none";
    }else{
        containercarta2.style.display = "block";
    }
});

