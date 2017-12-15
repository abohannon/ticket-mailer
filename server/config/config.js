const Shopify = require('shopify-api-node');

const shopify = new Shopify({
  shopName: 'dogdev',
  apiKey: '09c0f57708a6a23f8e62a45a1c272b32',
  password: '0702e12b7d064692508d314353ee0980',
});

module.exports = shopify;
