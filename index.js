require('dotenv').config()

let express = require('express'),
	compression = require('compression'),
	app = express()

app.set('views', './views')
app.set('view engine', 'pug')

app.use(compression())
app.use(express.static('dist'))

app.get('/', (req, res) =>
	res.render('index')
)

app.listen(process.env.PORT || 3000)