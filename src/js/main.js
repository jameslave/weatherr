// document.cookie = 'temp=f'
// document.cookie = 'hours=8'

let refresh = require('./refresh')
require('./settings-menu')

let refreshIcon = document.getElementById('refresh-icon')

refreshIcon.addEventListener('click', () => {
  refresh()
})

// Refresh on page load
refresh()
