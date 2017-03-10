function setLocation(data) {
	let locationEl = document.getElementById('location')
	locationEl.innerText = data.loc
}

function setTemp(data) {
	let tempEl = document.getElementById('temp')
	// check for existence of cookie
	let tempPref = document.cookie ?
		// then set it either to user preference or 'f'
		document.cookie.match(/temp=(f|c)/)[1] || 'f' : 'f'
	tempEl.innerText = `${data[tempPref]} °${tempPref.toUpperCase()}`
}

function setForecast(data, hoursAhead) {
	let hoursEl = document.getElementById('forecast-hours')
	let tempTextEl = document.getElementById('forecast-temp-text')
	let windTextEl = document.getElementById('forecast-wind-text')
	let precipTextEl = document.getElementById('forecast-precip-text')

	hoursEl.innerText = hoursAhead
	tempTextEl.innerText = data.tempStr
	windTextEl.innerText = data.windStr
	precipTextEl.innerText = data.precipStr
}

exports.inject = (data, hoursAhead) => {
	setLocation(data)
	setTemp(data)
	setForecast(data, hoursAhead)
}