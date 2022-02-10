// module.exports = {
//   authenticator: (req, res, next) => {
//   if (req.isAuthenticated()) {
//     //req.isAuthenticated() will return true if user is logged in
//     return next();  // 接下來去 home
//   } else {
//     res.redirect('/users/login');
//   }
// }
// }


module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/users/login')
  }
}