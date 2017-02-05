require('dotenv').config()

var express = require('express')
var compression = require('compression')
var sass = require('node-sass-middleware')
var bodyParser = require('body-parser')

var app = module.exports = express()

app.set('views', './views')
app.set('view engine', 'pug')

app.use(compression())
app.use(sass({
	src: __dirname + '/scss',
	dest: __dirname + '/public/css',
	outputStyle: 'compressed',
	prefix: '/css'
}))
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', require('./routes/index'))

app.listen(3000)