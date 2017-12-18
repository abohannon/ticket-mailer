const Shopify = require('shopify-api-node')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const User = mongoose.model('users')

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
  },

  createUser (req, res) {
    const newUser = new User({
      name: 'Adam',
      email: 'abo46n2@gmail.com',
      password: 123
    })
    newUser.save()
      .then(() => {
        res.redirect('/login')
      })
  }
}
