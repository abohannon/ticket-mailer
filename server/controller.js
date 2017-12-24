const Shopify = require('shopify-api-node')
const mongoose = require('mongoose')
const User = mongoose.model('users')
const passport = require('passport')
const keys = require('./config/keys')

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
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err)
      if (!user) {
        return res.json({ success: false, message: info.message })
      }
      req.login(user, loginErr => {
        if (loginErr) {
          return res.json({ success: false, message: loginErr })
        }
        return res.json({ success: true, message: 'Auth succeeded' })
      })
    })(req, res, next)
  },

  logoutUser (req, res, next) {
    req.logout()
    return res.json({ success: true, message: 'Logout successful' })
  },

  // loginUser (req, res, next) {
  //   if (req.body.email && req.body.password) {
  //     User.authenticate(req.body.email, req.body.password, (err, user) => {
  //       if (err || !user) {
  //         const err = new Error('Wrong email or password')
  //         err.status = 401
  //         return next(err)
  //       } else {
  //         req.session.userId = user._id
  //         console.log(req.session)
  //         return res.send(req.session.userId)
  //       }
  //     })
  //   }
  // },

  // logoutUser (req, res, next) {
  //   if (req.session) {
  //     // delete session object
  //     req.session.destroy((err) => {
  //       if (err) {
  //         return next(err)
  //       }
  //       return res.send(req.session)
  //     })
  //   }
  // },

  currentUser (req, res, next) {
    res.send(req.user)
    console.log('current user', req.user)
  }

}
