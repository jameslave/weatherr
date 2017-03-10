let request = require('request')

exports.getJSON = function(coordsObj) {
	let coords = coordsObj.lat.toString() + ',' + coordsObj.lon.toString()

	let apiUrl = 'http://api.wunderground.com/api/'
	apiUrl += process.env.KEY
	apiUrl += '/conditions/hourly/q/'
	apiUrl += coords
	apiUrl += '.json'

	return new Promise((resolve, reject) => {
		request(apiUrl, (err, res) => {
			if (err) {
				reject(err)
				return
			}
			resolve(JSON.parse(res.body))
		})
	})
}