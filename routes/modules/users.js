const express = require('express')
const router = express.Router()

const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

// router.post('/login', passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/users/login'
// }), () => {console.log('??')})
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  }))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  if (!email || !password || !confirmPassword) {
    errors.push({ message: '除了name，其他欄位都是必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  // 檢查使用者是否已經註冊
  User.findOne({ email }).then(
    user => {
      if (user) {
        console.log('User already exists.')
        errors.push({ message: '這個 Email 已經註冊過了。' })
        res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(password, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash // 用雜湊值取代原本的使用者密碼
          }))
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      }
    })
})

router.get('/logout', function (req, res) {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router
