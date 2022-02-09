const express = require('express')
require('./config/mongoose')
const routes = require('./routes')
const session = require('express-session')
const PORT = 3000
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const usePassport = require('./config/passport') // function
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
app.use(session({
  secret: 'thisIsMySecret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
usePassport(app)

app.use(routes)
app.listen(PORT)