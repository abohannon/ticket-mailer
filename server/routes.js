const passport = require('passport')
const Controller = require('./controller')

module.exports = (app) => {
  app.get('/api/orders/', Controller.getAllOrders)
  app.get('/api/orders/:id', Controller.getVariantOrders)
  app.get('/api/collection_products/:id', Controller.getCollectionProducts)
  app.get('/api/collections', Controller.getCollections)
  app.get('/api/products/', Controller.getProducts)
  app.post('/api/create_user', Controller.createUser)
  app.post('/api/login', Controller.loginUser)
  app.get('/api/logout', Controller.logoutUser)
  app.get('/api/current_user', Controller.currentUser)
  app.get('/api/email', Controller.sendEmail)
}
