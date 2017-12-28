const mongoose = require('mongoose')
const keys = require('../config/dev')
const User = mongoose.model('users')

mongoose.Promise = global.Promise

// Make sure we're connected to the db before we run our tests'
before((done) => {
  mongoose.connect(keys.mongoURI)
  mongoose.connection
    .once('open', () => { done() })
    .on('error', (error) => console.log('Warning', error))
})
