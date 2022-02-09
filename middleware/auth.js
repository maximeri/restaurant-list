module.exports = {
  authenticator: (req, res, next) => {
  if (req.isAuthenticated()) {
    //req.isAuthenticated() will return true if user is logged in
    next();  // 接下來去 home
  } else {
    res.redirect("/users/login");
  }
}
}