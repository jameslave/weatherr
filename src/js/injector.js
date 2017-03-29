function setLocation (data) {
  let location = document.getElementById('location')
  location.innerText = data.loc
}

function setTemp (data) {
  let temp = document.getElementById('temp')
  // check for existence of cookie
  // then set it either to user preference or 'f'
  let tempPref = document.cookie ? document.cookie.match(/temp=(f|c)/)[1] || 'f' : 'f'
  temp.innerText = `${data[tempPref]} °${tempPref.toUpperCase()}`
}

function setForecast (data, hoursAhead) {
  let forecastHours = document.getElementById('forecast-hours')
  let forecastTempText = document.getElementById('forecast-temp-text')
  let forecastWindText = document.getElementById('forecast-wind-text')
  let forecastPrecipText = document.getElementById('forecast-precip-text')

  forecastHours.innerText = hoursAhead
  forecastTempText.innerText = data.tempStr
  forecastWindText.innerText = data.windStr
  forecastPrecipText.innerText = data.precipStr
}

function setBackground (data) {
  let main = document.getElementsByTagName('main')[0]
  let gradient = 'linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4))'
  let img = `img/backgrounds/${data.maxForecast}.jpg`
  let url = `url('${img}') no-repeat center center`
  main.style.background = `${gradient}, ${url}`
}

function setIcon (data) {
  let currentIcon = document.getElementById('current-icon')
  currentIcon.setAttribute('src', `img/icons/${data.icon}.svg`)
}

exports.inject = (data, hoursAhead) => {
  return new Promise(resolve => {
    window.weather = data
    setLocation(data)
    setIcon(data)
    setTemp(data)
    setForecast(data, hoursAhead)
    setBackground(data)
    resolve()
  })
}
