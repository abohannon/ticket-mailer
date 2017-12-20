const passport = require('passport')
const Controller = require('./controller')

module.exports = (app) => {
  // TODO: Is collections necessary?
  // app.get('/api/collections', Controller.getCollections)
  app.get('/api/products', Controller.getProducts)
  app.post('/api/create_user', Controller.createUser)
  // app.post('/api/login', passport.authenticate('local', {
  //   successRedirect: '/',
  //   failureRedirect: '/signup'
  // }), Controller.loginUser)
  app.post('/api/login', Controller.loginUser)
  app.get('/api/logout', Controller.logoutUser)
}
