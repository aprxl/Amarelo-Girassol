const setLocalStorage = (usuario) => localStorage.setItem("usuario", JSON.stringify(usuario)); /* passa o cadastro do usuario pra um banco de dados JSON */

function btnEntrar() {  /* botao que faz ele ir pra sala */

    /* DEFININDO VARIAVEIS */
    var inputNome = document.getElementById('nome').value;
    const idUsuario = (Math.random() * 10000).toString();
    var patacas = 0;
    var numerocartas = 2;
    var pronto1 = false;
    const meubaralho = [];
  
    setLocalStorage({
        nome: inputNome, /* nome do fulano */

        meuId: idUsuario, /* id do usuario */

        patacas: patacas, /* numero de patacas que ele tem inicialmente */

        cartas: numerocartas, /* numero de cartas que ele tem inicalmente */

        pronto: pronto1, /* ver se ele ta pronto pra começar o jogo */

        minhaMao: meubaralho /* Ver quais cartas ele tem */
    });
    
    window.location.href="chat.html?usuarionome="+ inputNome + "&meuid=" + idUsuario; /* faz ele ir para o endereço da web com o chat.html */
}
