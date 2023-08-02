// Check if user is logged in
exports.isLoggedIn = (req, res, next) => {
  if (!req.user) return res.status(401).send('Access Denied. Please, Log in!')
  next()
}
