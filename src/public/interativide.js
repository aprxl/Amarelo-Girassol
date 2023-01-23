var ul = document.querySelector('nav ul')
var menuBtn = document.querySelector('.menu-btn i')

function menuShow() {
  if (ul.classList.contains('open')) {
    ul.classList.remove('open')
  } else {
    ul.classList.add('open')
  }
}

var btn = document.getElementById('mostrar')
var container = document.querySelector('.card')

btn.addEventListener('click', function () {
  if (container.style.display === 'block') {
    container.style.display = 'none'
  } else {
    container.style.display = 'block'
  }
})

const audio = new Audio(
  './Audio/zapsplat_multimedia_button_click_bright_002_92099.mp3'
)
const buttonClick = () => {
  audio.play()
}
