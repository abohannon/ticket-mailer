const Shopify = require('shopify-api-node')
const keys = require('./config/keys')

const shopify = new Shopify({
  shopName: keys.shopName,
  apiKey: keys.apiKey,
  password: keys.password
})

module.exports = {
  // getCollections (req, res) {
  //   shopify.collectionListing.list()
  //     .then(collectionData => res.send(collectionData))
  //     .catch((err) => {
  //       console.log(err)
  //       res.send('404 Not Found')
  //     })
  // },

  getProducts (req, res) {
    shopify.productListing.list()
      .then((productData) => {
        res.send(productData)
      }).then(() => {
        shopify.on('callLimits', limits => console.log('limits', limits))
      })
      .catch((err) => {
        console.log('Error with product fetch', err)
      })
  }
}
