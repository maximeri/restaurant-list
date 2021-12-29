const express = require('express')
const router = express.Router()
// 引入 home 模組程式碼
const home = require('./modules/home')
// 引入 restaurants 模組程式碼
const restaurants = require('./modules/restaurants')

router.use('/',home)
router.use('/restaurants',restaurants)



module.exports = router