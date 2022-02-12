const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')


// 直接匯出 function 
module.exports = app => {
  // 初始化 Passport 模組 (Middleware)
  app.use(passport.initialize());
  app.use(passport.session());
   // 設定本地登入策略 (Strategy)
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered!' })
        }
        if (user.password !== password) {
          return done(null, false, { message: 'Email or Password incorrect.' })
        }
        console.log("log in success")
        return done(null, user)
      })
      .catch(err => done(err, false))
  }))
  // 設定序列化與反序列化 (Session)
  passport.serializeUser((user, done) => {
    done(null, user.id)
    console.log("ser done")

  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => {
        console.log("deser done")
        done(null, user)
      })
      .catch(err => done(err, null))
  })
}