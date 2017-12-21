const checkAuth = (req, res, next) => {
  if (!req.session.userId) {
    req.send('Unauthorized. Please log in.')
  } else {
    next()
  }
}

module.exports = checkAuth
