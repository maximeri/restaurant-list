const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// create restaurant
router.get('/new', (req, res) => {
  return res.render('new')
})

// view restaurant
router.get('/:id', (req, res) => {
  const userId = req.user._id
  // 改用 findOne 之後，Mongoose 就不會自動幫我們轉換 id 和 _id，所以這裡要寫和資料庫一樣的屬性名稱，也就是 _id。
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

// edit
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant: restaurant })
      .catch(error => console.log(error)))
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const name = req.body.name
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const rating = req.body.rating
  const description = req.body.description
  return Restaurant.create({ name, category, image, location, phone, rating, description, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// edit restaurant
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description

  return Restaurant.findOne({ _id, userId })
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
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

// delete restaurant
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// search by name or category
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const userId = req.user._id
  return Restaurant.findOne({ userId }).find().or([{ name: { $regex: keyword, $options: 'i' } }, { category: { $regex: keyword, $options: 'i' } }]).lean()
    .then(searchResult => res.render('index', { restaurants: searchResult, keyword: keyword }))
})

module.exports = router
