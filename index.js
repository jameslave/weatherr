require('dotenv').config()

let express = require('express'),
		compression = require('compression'),
		app = module.exports = express()

app.locals = require('./app-info')

app.set('views', './views')
app.set('view engine', 'pug')

app.use(compression())
app.use(express.static('build'))

//app.use('/', require('./routes/index'))
app.get('/', (req, res) =>
	res.render('index', app.locals)
)

app.listen(process.env.PORT || 3000)