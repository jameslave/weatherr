let location = require('./location'),
	parser = require('./weather-parser')

let weatherData = null

location.get()
	.then(loc => location.send(loc))
	.then(json => parser.getWeather(json, 8))
	.then(output => console.log(output))