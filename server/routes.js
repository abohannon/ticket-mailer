const Controller = require('./controller')

module.exports = (app) => {
  app.get('/api/collections', Controller.getCollections)
}
