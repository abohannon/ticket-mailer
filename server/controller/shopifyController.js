const Shopify = require('shopify-api-node');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const shopify = new Shopify({
  shopName: keys.shopName,
  apiKey: keys.apiKey,
  password: keys.password,
});

module.exports = {
  getCollections(req, res) {
    shopify.collectionListing
      .list()
      .then(collectionData => res.send(collectionData))
      .catch(err => console.log('Error fetching collections', err));
  },

  getProducts(req, res) {
    shopify.productListing
      .list()
      .then(productData => res.send(productData))
      .catch(err => console.log('Error with product fetch', err));
  },

  getCollectionProducts(req, res) {
    shopify.productListing
      .list({ collection_id: req.params.id })
      .then(products => res.send(products))
      .catch(err => console.log('Error fetching collection products', err));
  },

  getVariantOrders(req, res) {
    shopify.order
      .list()
      .then((orders) => {
        const variantId = Number(req.params.id);
        const variantOrders = orders.filter(order => order.line_items[0].variant_id === variantId);
        res.send(variantOrders);
      })
      .catch(err => console.log('Error fetching orders', err));
  },

  getAllOrders(req, res) {
    shopify.order
      .list({ limit: 100 })
      .then((orders) => {
        res.send(orders);
        console.log(orders.length);
      })
      .catch(err => console.log('Error fetching orders', err));
  },
};
