const userAuth = (req, res, next) => {
  if (req.session.userId) { return next() } else { return res.sendStatus(401) }
}

module.exports = userAuth
