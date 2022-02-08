const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// create restaurant
router.get('/new', (req, res) => {
  return res.render('new')
})

// render details(show)
router.get('/:restaurantId', (req, res) => {
  const id = req.params.restaurantId
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant: restaurant }))
})

router.post('/', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return Restaurant.create({ name, category, image, location, phone, rating, description })
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})

// edit read
router.get('/:restaurantId/edit', (req, res) => {
  const id = req.params.restaurantId
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant: restaurant }))
})

// edit restaurant
router.put('/:id', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description

  return Restaurant.findById(id)
    .then((restaurant) => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// delete restaurant
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(restaurant => res.redirect('/'))
})

//search by name or category
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  return Restaurant.find().or([{ "name": { $regex: keyword, $options: 'i' } }, { "category": { $regex: keyword, $options: 'i' } }]).lean()
    .then(searchResult => res.render('index', { restaurants: searchResult, keyword: keyword }))
})

module.exports = router