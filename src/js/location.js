/* global XMLHttpRequest */

exports.get = () => {
  // promise returns user location when it's determined
  return new Promise((resolve, reject) => {
    // if browser can get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        resolve({lat: pos.coords.latitude, lon: pos.coords.longitude})
      })
    } else {
      reject(Error('Browser does not support geolocation'))
    }
  })
}

exports.send = (coordsObj) => {
  // promise returns server response when it's received
  return new Promise((resolve, reject) => {
    // POST user's location to the server, which will make the API call
    var req = new XMLHttpRequest()

    req.open('POST', 'location', true)
    req.setRequestHeader('Content-Type', 'application/json')
    req.send(JSON.stringify(coordsObj))

    req.onerror = () => {
      reject(Error('Connection to server failed'))
    }
    req.onreadystatechange = () => {
      if (req.readyState === 4 && req.status === 200) {
        // resolve promise if request is complete and OK
        resolve(JSON.parse(req.responseText))
      }
    }
  })
}
