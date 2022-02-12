const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// home page
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

//sort
router.get('/sort-name-asc', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ name: 'asc' })
    .then(restaurants => res.render('index', { restaurants: restaurants }))
})

router.get('/sort-name-desc', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ name: 'desc' })
    .then(restaurants => res.render('index', { restaurants: restaurants }))
})

router.get('/sort-category', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ category: 'asc' })
    .then(restaurants => res.render('index', { restaurants: restaurants }))
})

router.get('/sort-location', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ location: 'asc' })
    .then(restaurants => res.render('index', { restaurants: restaurants }))
})

module.exports = router