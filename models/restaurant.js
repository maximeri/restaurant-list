const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  name: {
    type: String,
    reauired: true
  },
  name_en: {
    type: String,
    reauired: true
  },
  category: {
    type: String,
    reauired: true
  },
  image: {
    type: String,
    reauired: true
  },
  location: {
    type: String,
    reauired: true
  },
  phone: {
    type: String,
    reauired: true
  },
  google_map: {
    type: String,
    reauired: true
  },
  rating: {
    type: Number,
    reauired: true
  },
  description: {
    type: String,
    reauired: true
  }
})

module.exports = mongoose.model('Restaurant', restaurantSchema) // export 我 create 的 mongoose 的 model(包含 method）的實例（instance） 叫 restaurants  

// mongoose 原文：Models are fancy constructors compiled from Schema definitions. An instance of a model is called a document. Models are responsible for creating and reading documents from the underlying MongoDB database.