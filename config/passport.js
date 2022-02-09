const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user')

// 直接匯出 function 
module.exports = japp => {
  // 初始化 Passport 模組 (Middleware)
  japp.use(passport.initialize());
  japp.use(passport.session());
   // 設定本地登入策略 (Strategy)
  passport.use(new LocalStrategy(
    function (email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (user.password !== password) { return done(null, false); }
        return done(null, user);
      });
    }
  ));
  // 設定序列化與反序列化 (Session)
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}