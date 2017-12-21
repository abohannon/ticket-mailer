const Controller = require('./controller')
const checkAuth = require('./services/userAuth')

module.exports = (app) => {
  // TODO: Is collections necessary?
  // app.get('/api/collections', Controller.getCollections)
  app.get('/api/products', Controller.getProducts)
  app.post('/api/create_user', Controller.createUser)
  app.post('/api/login', Controller.loginUser)
  app.get('/api/logout', Controller.logoutUser)
  app.get('/api/current_user', Controller.currentUser)
  app.get('/api/home', checkAuth, Controller.serveHome) // this works
}
