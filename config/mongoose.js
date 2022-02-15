const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/restaurant-list'
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.once('open', () => {
  console.log('MongoDB running')
}).on('error', () => {
  console.log('err')
})

module.exports = db
