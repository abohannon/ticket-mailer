const Shopify = require('shopify-api-node');
const keys = require('./config/keys');

const shopify = new Shopify({
  shopName: keys.shopName,
  apiKey: keys.apiKey,
  password: keys.password,
});

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
