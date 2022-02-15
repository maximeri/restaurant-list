const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

// 直接匯出 function
module.exports = app => {
  // 初始化 Passport 模組 (Middleware)
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略 (Strategy)
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered!' })
        }
        return bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            return done(null, false, { message: 'Email or Password incorrect.' })
          }
          return done(null, user)
        })
      })
      .catch(err => done(err, false))
  }))
  // 設定facebook登入策略 (Strategy)
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_SECRET,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName'] // 這個設定是和 Facebook 要求開放的資料，我們要了兩種資料：email：這是必要的，需要拿回來當成帳號displayName：Facebook 上的公開名稱，也許能和 User 的 name 屬性對應起來
  }, (accessToken, refreshToken, profile, done) => {
    const { email, name } = profile._json
    console.log(profile)
    User.findOne({ email })
      .then(user => {
        if (user) { return done(null, user) }
        const randomPassword = Math.random().toString(36).slice(-8)
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(user => done(null, user))
          .catch(err => done(err, false))
      })
  }))

  // 設定序列化與反序列化 (Session)
  passport.serializeUser((user, done) => {
    done(null, user.id)
    console.log('ser done')
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => {
        console.log('deser done')
        done(null, user)
      })
      .catch(err => done(err, null))
  })
}
