const mongoose = require('mongoose')
const keys = require('../config/keys')
const User = mongoose.model('users')

mongoose.Promise = global.Promise

// Make sure we're connected to the db before we run our tests'
before((done) => {
  mongoose.connect(keys.mongoURI)
  mongoose.connection
    .once('open', () => { done() })
    .on('error', (error) => console.log('Warning', error))
})

// XXX: Create separate test db?
// beforeEach((done) => {
//   User.find({ firstname: 'TestName' })
//     .then((user) => {
//       if (user) {
//         user.remove()
//         done()
//       }
//     })
// })
