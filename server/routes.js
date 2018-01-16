const Controller = require('./controller')
const requireLogin = require('./middlewares/requireLogin')

module.exports = (app) => {
  app.get('/api/orders', requireLogin, Controller.getAllOrders)
  app.get('/api/orders/:id', requireLogin, Controller.getVariantOrders)
  app.get('/api/collection_products/:id', requireLogin, Controller.getCollectionProducts)
  app.get('/api/collections', requireLogin, Controller.getCollections)
  app.get('/api/products', requireLogin, Controller.getProducts)
  app.post('/api/create_user', Controller.createUser)
  app.post('/api/login', Controller.loginUser)
  app.get('/api/logout', Controller.logoutUser)
  app.get('/api/current_user', Controller.currentUser)
  app.post('/api/email', requireLogin, Controller.sendEmail)
}
