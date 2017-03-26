document.cookie = 'temp=f'
document.cookie = 'hours=8'

let refresh = require('./refresh')

let refreshIcon = document.getElementById('refresh-icon')
let settingsIcon = document.getElementById('settings-icon')
let settingsMenu = document.getElementById('settings-menu')
let toggleItem = document.querySelectorAll('.toggle-item')

refreshIcon.addEventListener('click', () => {
  refresh()
})

window.addEventListener('load', () => {
  settingsMenu.style.right = window.innerWidth - settingsIcon.getBoundingClientRect().right + 'px'
})

settingsIcon.addEventListener('click', () => {
  settingsMenu.style.display = 'none'
})

// Refresh on page load
refresh()
