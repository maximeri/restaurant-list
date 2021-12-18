const express = require('express')
const port = 3000
const app = express()
const { engine } = require('express-handlebars') //ES6 Destructuring ref: https://stackoverflow.com/questions/41058569/what-is-the-difference-between-const-and-const-in-javascript
// const eh = require('express-handlebars')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true })) // To handle HTTP POST requests in Express.js version 4 and above, you need to install the middleware module called body-parser. body - parser extracts the entire body portion of an incoming request stream and exposes it on req.body.
const mongoose = require('mongoose')
mongoose.connect(`mongodb://localhost/restaurant-list`, { useNewUrlParser: true, useUnifiedTopology: true })
const restaurantSchema = new mongoose.Schema({
  name: String
});
const Restaurants = mongoose.model('Restaurants', restaurantSchema);
const db = mongoose.connection
const restaurantList = require('./restaurant.json')

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


app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurantId', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurantId)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants:restaurants,keyword: keyword })
})

app.use(express.static('public'))
app.listen(port)

// eh = {
//   engine: {...},
//   name: 'qweqe',
//   url: 'qweqwe',
// }


