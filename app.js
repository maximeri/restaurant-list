const express = require('express')
require('./config/mongoose')
const routes = require('./routes')
const PORT = 3000
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const app = express()


// setting template engine
app.set('view engine', 'handlebars')
const config = {
  defaultLayout: 'main'
}; 
app.engine('handlebars', engine(config))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)
app.listen(PORT)