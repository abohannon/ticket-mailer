const shopifyController = require('./controller/shopifyController');
const userController = require('./controller/userController');
const emailController = require('./controller/emailController');
const requireLogin = require('./middlewares/requireLogin');

module.exports = (app) => {
  app.get('/api/orders', requireLogin, shopifyController.getAllOrders);
  app.get('/api/orders/:id', requireLogin, shopifyController.getVariantOrders);
  app.get('/api/collection_products/:id', requireLogin, shopifyController.getCollectionProducts);
  app.get('/api/collections', requireLogin, shopifyController.getCollections);
  app.get('/api/products', requireLogin, shopifyController.getProducts);
  app.post('/api/create_user', userController.createUser);
  app.post('/api/login', userController.loginUser);
  app.get('/api/logout', userController.logoutUser);
  app.get('/api/current_user', userController.currentUser);
  app.post('/api/email', requireLogin, emailController.sendEmail);
};
