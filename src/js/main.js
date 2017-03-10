document.cookie = 'temp=f'
document.cookie = 'hours=8'

let location = require('./location'),
	parser = require('./parser'),
	injector = require('./injector')

let weatherData = null
// check for existence of cookie
let hoursAhead = document.cookie ?
		// then set it either to user preference or 8
		document.cookie.match(/hours=(\d{1,2})/)[1] || 8 : 8

location.get() // location is scraped from the browser
	.then(loc => location.send(loc)) // then sent to the server
	.then(json => parser.getData(json, hoursAhead)) // server response is parsed
	.then(data => injector.inject(data, hoursAhead)) // then injected into the DOM