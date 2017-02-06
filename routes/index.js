var express = require('express')
var router = module.exports = express.Router()
var weather = require('../helpers/scrape.js')

router.get('/', function(req, res) {
	res.render('index')
})

/*router.get('/:location*', function(req, res) {
	///(^\d{5}$|^[-]?\d+[.]?\d+[,][-]?\d+[.]?\d+$)/.test(req.params.loc)
	weather.getFor(req.params.location, function(json) {
		res.send(json)
	})
})*/

router.post('/', function(req, res) {
	weather.getFor(req.body.location, function(json) {
		weather.parse(json, function(weatherData) {
			res.send(weatherData)
		})
	})
})