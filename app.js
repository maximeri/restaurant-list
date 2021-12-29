const express = require('express')
const routes = require('./routes')
const port = 3000
const app = express()
const { engine } = require('express-handlebars')
app.use(express.static('public'))
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
require('./config/mongoose')
const { required } = require('nodemon/lib/config')
const { links, append } = require('express/lib/response')

// setting template engine
app.set('view engine', 'handlebars')
const config = {
  defaultLayout: 'main'
}; //config 系统或各软件的配置参数
app.engine('handlebars', engine(config))

app.use(routes)

app.listen(port)