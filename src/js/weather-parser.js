// helper function to check if letiable is in range
function between(letiable, x0, x1) {
	return letiable >= x0 && letiable < x1
}

// formats temperature as a descriptive string
function formatTemp(json, hoursAhead) {
	let currentTemp = parseInt(json.current_observation.feelslike_f)
	let futureTemps = json.hourly_forecast.slice(0, hoursAhead).map(hour => {
		return parseInt(hour.temp.english)
	})
	let meanFutureTemp = futureTemps.reduce((a, b) => {return a + b}) / hoursAhead
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

	let currentDesc = (function(temp) {
		let index = Math.floor(temp / 10)
		if (index < 2) return tempStrs[2]
		if (index > 9) return tempStrs[9]
		return tempStrs[index]
	})(currentTemp)

	let futureDesc = (function(diff) {
		if (diff > 8) return 'get much warmer'
		if (diff > 3) return 'get warmer'
		if (Math.abs(diff) <= 3) return 'remain ' + currentDesc
		if (diff < -3) return 'get cooler'
		return 'get much cooler'
	})(tempDiff)

	let concatTemp = 'It\'s '
	concatTemp += currentDesc
	concatTemp += ' right now, '
	concatTemp += futureDesc.match(/^remain/g) ? 'and ' : 'but '
	concatTemp += 'it\'s going to '
	concatTemp += futureDesc
	concatTemp += '.'

	return concatTemp
}

// formats wind as a descriptive string
function formatWind(json, hoursAhead) {
	let currentWind = parseInt(json.current_observation.wind_mph)
	let futureWinds = json.hourly_forecast.slice(0, hoursAhead).map(hour => {
		return parseInt(hour.wspd.english)
	})
	let meanFutureWind = futureWinds.reduce((a, b) => {return a + b}) / hoursAhead
	let windDiff = meanFutureWind - currentWind

	let currentDesc = (function(wind) {
		if (wind >= 20.0) return 'really windy'
		if (between(wind, 10.0, 20.0)) return 'windy'
		if (between(wind, 5.0, 10.0)) return 'breezy'
		return 'calm'
	})(currentWind)

	let futureDesc = (function(diff) {
		if (diff > 10.0) return 'get much windier'
		if (diff > 5.0) return 'get windier'
		if (Math.abs(diff) <= 5.0) return 'remain ' + currentDesc
		if (diff < -5.0) return 'get calmer'
		return 'get much calmer'
	})(windDiff)

	let concatWind = 'It\'s '
	concatWind += currentDesc
	concatWind += ' right now, '
	concatWind += futureDesc.match(/^remain/g) ? 'and ' : 'but '
	concatWind += 'it\'s going to '
	concatWind += futureDesc
	concatWind += '.'

	return concatWind
}

// formats precipitation as a descriptive string
function formatPrecip(json, hoursAhead) {
	/* Find max precip probability and max forecast code as given at 
		 http://www.wunderground.com/weather/api/d/docs?d=resources/phrase-glossary.
		 This can be correlated with clear/rain/snow.
	*/

	let futureHours = json.hourly_forecast.slice(0, hoursAhead)
	
	// get future probabilities of precipitation
	let futureProbs = futureHours.map(hour => {
		return parseInt(hour.pop)
	})
	// and future forecast codes
	let futureCodes = futureHours.map(hour => {
		return parseInt(hour.fctcode)
	})

	let maxPrecipProb = Math.max(...futureProbs)
	let maxForecastCode = Math.max(...futureCodes)

	if ([10, 12, 14, 18, 20, 22].map(c => {return maxForecastCode === c}).reduce((a,b) => {return a && b})) {
		maxForecastCode++
	}

	let currentDesc
	let icon = json.current_observation.icon

	if ( icon.match(/rain|sleet|storm/g) ) currentDesc = 'rainy'
	else if ( icon.match(/snow|flurries/g) ) currentDesc = 'snowy'
	else currentDesc = 'dry'

	let futureDesc = (function(prob) {
		if (prob >= 80.0) return 'It will be wet'
		if (between(prob, 40.0, 80.0)) return 'There\'s a good chance of precipitation'
		if (between(prob, 10.0, 40.0)) return 'There\'s a slight chance of precipitation'
		return 'It will be dry'
	})(maxPrecipProb)

	let concatPrecip = 'It\'s '
	concatPrecip += currentDesc
	concatPrecip += ' right now. '
	concatPrecip += futureDesc
	concatPrecip += ' later.'

	return concatPrecip
}

exports.getWeather = function(json, hoursAhead) {
	return new Promise((resolve, reject) => {
		let weatherData = {}
		weatherData.loc = json.current_observation.display_location.city
		weatherData.tempF = json.current_observation.feelslike_f
		weatherData.tempC = json.current_observation.feelslike_c
		weatherData.tempStr = formatTemp(json, hoursAhead)
		weatherData.windStr = formatWind(json, hoursAhead)
		weatherData.precipStr = formatPrecip(json, hoursAhead)
		resolve(weatherData)
	})
}