const mongoose = require('mongoose')
mongoose.connect(`mongodb://localhost/restaurant-list`, { useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.once('open', () => {
  console.log('MongoDB running');
}).on('error', () => {
  console.log('err');
});

module.exports = db