const Shopify = require('shopify-api-node')
const mongoose = require('mongoose')

const User = mongoose.model('users')
const passport = require('passport')
const keys = require('./config/keys')
const sendMail = require('./services/mailer')

const shopify = new Shopify({
  shopName: keys.shopName,
  apiKey: keys.apiKey,
  password: keys.password,
})

module.exports = {

  // Shopify Endpoints

  getCollections(req, res) {
    shopify.collectionListing.list()
      .then(collectionData => res.send(collectionData))
      .catch(err => console.log('Error fetching collections', err))
  },

  getProducts(req, res) {
    shopify.productListing.list()
      .then(productData => res.send(productData))
      .catch(err => console.log('Error with product fetch', err))
  },

  getCollectionProducts(req, res) {
    shopify.productListing.list({ collection_id: req.params.id })
      .then(products => res.send(products))
      .catch(err => console.log('Error fetching collection products', err))
  },

  getVariantOrders(req, res) {
    shopify.order.list()
      .then((orders) => {
        const variantId = Number(req.params.id)
        const variantOrders = orders.filter(order => order.line_items[0].variant_id === variantId)
        res.send(variantOrders)
      })
      .catch(err => console.log('Error fetching orders', err))
  },

  getAllOrders(req, res) {
    shopify.order.list()
      .then((orders) => {
        res.send(orders)
      })
      .catch(err => console.log('Error fetching orders', err))
  },

  // User Endpoints

  createUser(req, res) {
    if (
      req.body.firstName &&
      req.body.email &&
      req.body.password
    ) {
      const userData = {
        firstName: req.body.firstName,
        email: req.body.email,
        password: req.body.password,
      }

      User.create(userData, (err, user, next) => {
        if (err) return next(err)
        return res.send(userData)
      })
    }
  },

  loginUser(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err)
      if (!user) {
        return res.json({ success: false, message: info.message })
      }
      req.login(user, (loginErr) => {
        if (loginErr) {
          return res.json({ success: false, message: loginErr })
        }
        return res.json({ success: true, message: 'Auth succeeded' })
      })
    })(req, res, next)
  },

  logoutUser(req, res, next) {
    req.logout()
    return res.json({ success: true, message: 'Logout successful' })
  },

  currentUser(req, res, next) {
    res.send(req.user)
  },

  sendEmail(req, res, next) {
    const { subject, text } = req.body

    const content = {
      subject,
      text,
    }

    sendMail(content)

    console.log('sendMail contoller')
  },

}
