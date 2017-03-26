// helper function to check if variable is in range
function between (letiable, x0, x1) {
  return letiable >= x0 && letiable < x1
}

// formats temperature as a descriptive string
function formatTemp (json, hoursAhead) {
  let currentTemp = parseInt(json.current_observation.feelslike_f)
  let futureTemps = json.hourly_forecast.slice(0, hoursAhead).map(hour => parseInt(hour.temp.english))
  let meanFutureTemp = futureTemps.reduce((a, b) => a + b) / hoursAhead
  let tempDiff = meanFutureTemp - currentTemp

  let tempStrs = {
    2: 'very cold',
    3: 'cold',
    4: 'chilly',
    5: 'cool',
    6: 'nice',
    7: 'really nice',
    8: 'hot',
    9: 'very hot'
  }

  let currentDesc = (function (temp) {
    let index = Math.floor(temp / 10)
    if (index < 2) return tempStrs[2]
    if (index > 9) return tempStrs[9]
    return tempStrs[index]
  })(currentTemp)

  let futureDesc = (function (diff) {
    if (diff > 8) return 'get much warmer'
    if (diff > 3) return 'get warmer'
    if (Math.abs(diff) <= 3) return 'stay ' + currentDesc
    if (diff < -3) return 'get cooler'
    return 'get much cooler'
  })(tempDiff)

  let concatTemp = 'It\'s going to '
  concatTemp += futureDesc
  concatTemp += '.'

  return concatTemp
}

// formats wind as a descriptive string
function formatWind (json, hoursAhead) {
  let currentWind = parseInt(json.current_observation.wind_mph)
  let futureWinds = json.hourly_forecast.slice(0, hoursAhead).map(hour => parseInt(hour.wspd.english))
  let meanFutureWind = futureWinds.reduce((a, b) => a + b) / hoursAhead
  let windDiff = meanFutureWind - currentWind

  let currentDesc = (function (wind) {
    if (wind >= 20.0) return 'really windy'
    if (between(wind, 10.0, 20.0)) return 'windy'
    if (between(wind, 5.0, 10.0)) return 'breezy'
    return 'calm'
  })(currentWind)

  let futureDesc = (function (diff) {
    if (diff > 10.0) return 'get much windier'
    if (diff > 5.0) return 'get windier'
    if (Math.abs(diff) <= 5.0) return 'stay ' + currentDesc
    if (diff < -5.0) return 'get calmer'
    return 'get much calmer'
  })(windDiff)

  let concatWind = 'It\'s going to '
  concatWind += futureDesc
  concatWind += '.'

  return concatWind
}

// formats precipitation as a descriptive string
function formatPrecip (json, hoursAhead) {
  /* Find max precip probability and max forecast code as given at
     http://www.wunderground.com/weather/api/d/docs?d=resources/phrase-glossary.
     This can be correlated with clear/rain/snow.
  */

  let futureHours = json.hourly_forecast.slice(0, hoursAhead)

  // get future probabilities of precipitation
  let futureProbs = futureHours.map(hour => parseInt(hour.pop))
  // and future forecast codes
  let futureCodes = futureHours.map(hour => parseInt(hour.fctcode))

  let maxPrecipProb = Math.max(...futureProbs)
  let maxForecastCode = Math.max(...futureCodes)

  if ([10, 12, 14, 18, 20, 22].includes(maxForecastCode)) {
    maxForecastCode++
  }

  // let icon = json.current_observation.icon

  let futureDesc = (function (prob) {
    if (prob >= 80.0) return 'It will be wet'
    if (between(prob, 40.0, 80.0)) return 'There\'s a good chance of precipitation'
    if (between(prob, 10.0, 40.0)) return 'There\'s a slight chance of precipitation'
    return 'It will be dry'
  })(maxPrecipProb)

  let concatPrecip = futureDesc
  concatPrecip += '.'

  return {maxForecast: maxForecastCode, str: concatPrecip}
}

exports.parse = (json, hoursAhead) => {
  return new Promise(resolve => {
    let weatherData = {}
    let icon = json.current_observation.icon_url.match(/\w\/(\w+).gif$/)[1]

    weatherData.loc = json.current_observation.display_location.city
    weatherData.icon = icon
    weatherData.f = json.current_observation.feelslike_f
    weatherData.c = json.current_observation.feelslike_c
    weatherData.tempStr = formatTemp(json, hoursAhead)
    weatherData.windStr = formatWind(json, hoursAhead)

    let precipObj = formatPrecip(json, hoursAhead)
    weatherData.precipStr = precipObj.str
    weatherData.maxForecast = precipObj.maxForecast

    resolve(weatherData)
  })
}
