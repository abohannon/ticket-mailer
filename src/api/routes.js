const Controller = require('./controller');

module.exports = (app) => {
  app.get('/', Controller.greeting);
  app.get('/api/collections', Controller.getCollections);
};
