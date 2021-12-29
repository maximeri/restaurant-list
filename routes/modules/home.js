const express = require('express')
const router = express.Router()
const restaurants = require('../../models/restaurant')

// home page
router.get('/', (req, res) => {
  restaurants.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants: restaurants }))
})

module.exports = router