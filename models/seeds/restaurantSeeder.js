const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurant = require('../../models/restaurant')
const User = require('../../models/user')
const restaurantData = require('../../restaurant.json').results
const db = require('../../config/mongoose')
const SEED_USER = [{
  email: 'user1@example.com',
  password: '12345678',
  restaurants: restaurantData.slice(0, 3)
},
  {
    email: 'user2@example.com',
    password: '12345678',
    restaurants: restaurantData.slice(3,6)
  }]

db.once('open', async () => {
  for (let i = 0; i<2; i++) {
    await bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER[i].password, salt))
    .then(hash => User.create({
      email: SEED_USER[i].email,
      password: hash
    }))
      .then(async user => {
      const userId = user._id
      const restaurants = SEED_USER[i].restaurants.map(restaurant=> {
        return {
          name: restaurant.name,
          name_en: restaurant.name_en,
          category: restaurant.category,
          image: restaurant.image,
          location: restaurant.location,
          phone: restaurant.phone,
          google_map: restaurant.google_map,
          rating: restaurant.rating,
          description: restaurant.description,
          userId
        }
      }) 
      await Restaurant.create(restaurants)
    })}
      console.log('done.')
      process.exit()
})

