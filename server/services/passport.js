const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user)
    })
})

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
      if (err) { return done(err) }
      if (!user) {
        return done(null, false, { message: 'Incorrect username' })
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password' })
      }

      return done(null, user)
    })
  }))
