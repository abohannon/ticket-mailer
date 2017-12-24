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
      console.log('deserialize', user)
      done(null, user)
    })
})

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
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
        console.log('inside passport', user)
        return done(null, user)
      })

      // if (!user.validPassword(password)) {
      //   return done(null, false, { message: 'Incorrect password' })
      // }
      //
      // bcrypt.compare(password, user.password, (err, result) => {
      //   console.log(password)
      //   console.log(user.password)
      //   if (err) return done(err)
      //   if (!result) {
      //     return done(null, false)
      //   } else {
      //     return done(null, user)
      //   }
      // })
    })
  }))
