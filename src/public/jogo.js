const carta1 = [
  'bobo',
  'conselheiro',
  'eremita',
  'cavalheiro',
  'duque',
  'escriba',
  'monarca'
]
const primeiracarta = carta1[Math.floor(Math.random() * carta1.length)]
const segundacarta = carta1[Math.floor(Math.random() * carta1.length)]

function iniciarjogo(primeiracarta, segundacarta) {
  document.getElementById('primeircarta').innerHTML = 'primeira' + primeiracarta
  document.getElementById('segundacarta').innerHTML = 'segunda' + segundacarta
}

const audio = new Audio(
  './Audio/zapsplat_multimedia_button_click_bright_002_92099.mp3'
)
const buttonClick = () => {
  audio.play()
}
