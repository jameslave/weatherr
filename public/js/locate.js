function getLocation(_callback) {
	var userLocation
	var urlPath = window.location.pathname
	var urlLocation = urlPath.substr(urlPath.lastIndexOf('/') + 1)

	if (/^\d{5}$/.test(urlLocation)) {
		userLocation = urlLocation
		_callback(userLocation)
	} else if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(p) {
			userLocation = p.coords.latitude.toString() + ',' + p.coords.longitude.toString()
			_callback(userLocation)
		})
	} else {
		$.get('http://ipinfo.io/json', function(json) {
			userLocation = json.loc
			_callback(userLocation)
		})
	}
}

function sendLocation(location) {
	$.post('/', {location: location}, function(res) {
		console.log(res)
	})
}

getLocation(function(location) {
	sendLocation(location)
})