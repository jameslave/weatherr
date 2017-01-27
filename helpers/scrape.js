var najax = $ = require('najax')

exports.getFor = function(location, _callback) {
	var apiUrl = 'http://api.wunderground.com/api/'
	apiUrl += process.env.KEY
	apiUrl += '/conditions/hourly/q/'
	apiUrl += location
	apiUrl += '.json'

	$.get(apiUrl, function(res) {
		_callback(res)
	})
}

