const setLocalStorage = usuario =>
  localStorage.setItem('usuario', JSON.stringify(usuario))

const audio = new Audio(
  './Audio/zapsplat_multimedia_button_click_bright_002_92099.mp3'
)

function buttonClick(whichFunction) {
  audio.play()

  if (whichFunction !== undefined) {
    whichFunction()
  }
}

function cecilia() {
  console.log('cecilia')
}

function btnEntrar() {
  var inputNome = document.getElementById('nome').value
  var idUsuario = (Math.random() * 1000).toString()
  setLocalStorage({
    nome: inputNome,
    meuId: idUsuario
  })

  window.location.href =
    'pagJogo.html?usuarionome=' + inputNome + '&meuid=' + idUsuario
}
