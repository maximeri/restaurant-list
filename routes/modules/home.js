const express = require('express')
const router = express.Router()
const restaurants = require('../../models/restaurant')

// home page
router.get('/', (req, res) => {
  restaurants.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants: restaurants }))
})

router.get('/sort-name-asc',(req,res)=>{
  restaurants.find()
  .lean()
  .sort({ name: 'asc' })
  .then(restaurants => res.render('index', { restaurants: restaurants }))
})

router.get('/sort-name-desc', (req, res) => {
    restaurants.find()
      .lean()
      .sort({ name: 'desc' })
      .then(restaurants => res.render('index', { restaurants: restaurants }))
})

router.get('/sort-category', (req, res) => {
    restaurants.find()
      .lean()
      .sort({ category: 'asc' })
      .then(restaurants => res.render('index', { restaurants: restaurants }))
})

router.get('/sort-location', (req, res) => {
    restaurants.find()
      .lean()
      .sort({ location: 'asc' })
      .then(restaurants => res.render('index', { restaurants: restaurants }))
})

module.exports = router