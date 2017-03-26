let location = require('./location')
let parser = require('./parser')
let injector = require('./injector')

// check for existence of cookie
// then set it either to user preference or 8
let hoursAhead = document.cookie ? document.cookie.match(/hours=(\d{1,2})/)[1] || 8 : 8
let loadingScreen = document.getElementById('loading-screen')
let refreshIcon = document.getElementById('refresh-icon')

module.exports = () => {
  showLoading() // begin refresh icon spinning
  .then(() => location.get()) // location is scraped from the browser
  .then(loc => location.send(loc)) // then sent to the server
  .then(json => parser.parse(json, hoursAhead)) // server response is parsed
  .then(data => injector.inject(data, hoursAhead)) // then injected into the DOM
  .then(() => hideLoading()) // stop refresh icon spinning and hide load screen
}

function showLoading () {
  return new Promise(resolve => {
    refreshIcon.classList.add('animate-spin')
    resolve()
  })
}

function hideLoading () {
  return new Promise(resolve => {
    // fade loading screen
    loadingScreen.classList.add('animate-fade')
    // stop refresh icon from spinning
    refreshIcon.classList.remove('animate-spin')
    // unhide refresh on first load only
    if (refreshIcon.classList.contains('hidden')) {
      refreshIcon.classList.remove('hidden')
    }
    resolve()
  })
}
