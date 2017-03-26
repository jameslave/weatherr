let request = require('request')

exports.getJSON = (coordsObj) => {
  let coords = coordsObj.lat.toString() + ',' + coordsObj.lon.toString()

  // let apiUrl = ''
  // Save API calls during development
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