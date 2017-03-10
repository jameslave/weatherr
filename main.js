require('dotenv').config()

let express = require('express'),
	bodyParser = require('body-parser'),
	compression = require('compression'),
	app = express()

app.set('views', './views')
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(compression())
app.use(express.static('dist'))

app.use('/', require('./routes/index'))

app.listen(process.env.PORT || 3000)