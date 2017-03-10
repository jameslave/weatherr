let express = require('express'),
	router = module.exports = express.Router(),
	scrape = require('../helpers/scrape')

// GET /
router.get('/', (req, res) =>
	res.render('index')
)

// POST /
router.post('/location', (req, res) => {
	scrape.getJSON(req.body)
		.then(json => res.send(JSON.stringify(json)))
})