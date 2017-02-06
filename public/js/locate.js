function get(_callback) {
	// returns userLocation as String(lat, long)
	var userLocation

	// possibly a future feature
	/*var urlPath = window.location.pathname
	var urlLocation = urlPath.substr(urlPath.lastIndexOf('/') + 1)

	if (/^\d{5}$/.test(urlLocation)) {
		userLocation = urlLocation
		_callback(userLocation)
	} else */

	// try to get location from the browser
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(p) {
			userLocation = p.coords.latitude.toString() + ',' + p.coords.longitude.toString()
			_callback(userLocation)
		})
	} else {
		// otherwise make a call to ipinfo.io
		$.get('//ipinfo.io/json', function(json) {
			userLocation = json.loc
			_callback(userLocation)
		})
	}
}

function send(location) {
	// POST user's location to the server
	$.post('/', {location: location}, function(res) {
		console.log(res)
	})
}

get(function(location) {
	send(location)
})