window.addEventListener('resize', () => {
  document
    .querySelector(':root')
    .style.setProperty('--vh', window.innerHeight / 100 + 'px')
})

window.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector(':root')
    .style.setProperty('--vh', window.innerHeight / 100 + 'px')
})
