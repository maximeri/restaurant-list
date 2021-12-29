const express = require('express')
const routes = require('./routes')
const port = 3000
const app = express()
const { engine } = require('express-handlebars')
app.use(express.static('public'))
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
const mongoose = require('mongoose')
mongoose.connect(`mongodb://localhost/restaurant-list`, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

const { required } = require('nodemon/lib/config')
const { links, append } = require('express/lib/response')

// handle connections
db.once('open', () => {
  console.log('MongoDB running');
}).on('error', () => {
  console.log('err');
});

// setting template engine
app.set('view engine', 'handlebars')
const config = {
  defaultLayout: 'main'
}; //config 系统或各软件的配置参数
app.engine('handlebars', engine(config))

app.use(routes)

app.listen(port)