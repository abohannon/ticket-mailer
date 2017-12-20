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
    if (
      req.body.firstName &&
      req.body.email &&
      req.body.password
    ) {
      const userData = {
        firstName: req.body.firstName,
        email: req.body.email,
        password: req.body.password
      }

      User.create(userData, (err, user, next) => {
        if (err) return next(err)
        return res.send(userData)
      })
    }
  },

  loginUser (req, res, next) {
    if (req.body.email && req.body.password) {
      User.authenticate(req.body.email, req.body.password, (err, user) => {
        if (err || !user) {
          const err = new Error('Wrong email or password')
          err.status = 401
          return next(err)
        } else {
          req.session.userId = user._id
          console.log('loginUser', user)
          return res.send(req.session.userId)
        }
      })
    }
  },

  logoutUser (req, res, next) {
    if (req.session) {
      // delete session object
      req.session.destroy((err) => {
        if (err) return next(err)
        return res.send(req.session)
      })
    }
  }
  // loginUser (req, res) {
  //   const email = req.body.email
  //   User.findOne({ email })
  //     .then((user) => {
  //       if (!user) console.log('Error, no user found')
  //       res.send(user)
  //     }).catch(err => console.log(err))
  // }

}
