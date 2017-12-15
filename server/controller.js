const shopify = require('../config/config');

module.exports = {
  greeting(req, res) {
    res.send({ hello: 'world' });
  },

  getCollections(req, res) {
    shopify.collectionListing.list()
      .then(collectionData => res.send(collectionData))
      .catch((err) => {
        console.log(err);
        res.send('404 Not Found');
      });
  },
};
