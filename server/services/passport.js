const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')

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

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (username, password, done) => {
  User.findOne({ email: username }, (err, user) => {
    if (err) { return done(err) }

    if (!user) {
      return done(null, false, { message: 'Incorrect username' })
    }
    user.isPasswordValid(password, (err, isValid) => {
      if (err) {
        return done(err)
      }

      if (!isValid) {
        console.log('invalid password')
        return done(null, false, { message: 'Invalid password' })
      }
      console.log('Passport successfully found user', user)
      return done(null, user)
    })
  })
}))
