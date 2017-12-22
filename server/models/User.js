const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  firstName: {
    type: String,
    require: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

// userSchema.statics.authenticate = function (email, password, callback) {
//   User.findOne({ email: email })
//     .exec((err, user) => {
//       if (err) return callback(err)
//       if (!user) {
//         const err = new Error('User not found.')
//         err.status = 401
//         return callback(err)
//       }
//       bcrypt.compare(password, user.password, (err, result) => {
//         if (err) return callback(err)
//         if (result === true) {
//           return callback(null, user)
//         } else {
//           return callback()
//         }
//       })
//     })
// }

userSchema.methods.isPasswordValid = function (rawPassword, callback) {
  const user = this
  bcrypt.compare(rawPassword, user.password, function (err, same) {
    if (err) {
      callback(err)
    }
    callback(null, same)
  })
}

const saltRounds = 10

userSchema.pre('save', function (next) {
  const user = this
  bcrypt.hash(user.password, saltRounds, function (err, hash) {
    if (err) return next(err)
    user.password = hash
    next()
  })
})

mongoose.model('users', userSchema)
