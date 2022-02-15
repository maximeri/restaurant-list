const express = require('express')
const session = require('express-session')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const routes = require('./routes')
const usePassport = require('./config/passport') // function
const app = express()
const PORT = 3000
require('./config/mongoose')
// setting template engine
app.set('view engine', 'handlebars')
const config = {
  defaultLayout: 'main'
}
app.engine('handlebars', engine(config))
app.use(session({
  secret: 'ThisIsMyDevSecret',
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  console.log(req.isAuthenticated())
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
